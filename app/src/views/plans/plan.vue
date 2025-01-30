<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useExercisesStore } from '@/stores/exercisesStore';
import { useDailyChallengeStore } from '@/stores/dailyChallengeStore';
import { useUsersStore } from '@/stores/usersStore';

const categoriesStore = useCategoriesStore();
const exercisesStore = useExercisesStore();
const dailyChallengeStore = useDailyChallengeStore();
const usersStore = useUsersStore();

const route = useRoute();
const categoryId = route.params.id;
const isDailyChallenge = categoryId === 'daily-challenge';

const categoryName = ref('');
const categoryPoints = ref(0);
const exercises = ref<any[]>([]);
const currentExerciseIndex = ref(0);

const isComplete = ref(false);
const isBreak = ref(false);
const isExerciseActive = ref(false);
const countdown = ref(0);
const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null);
const exerciseDuration = 10;
const breakDuration = 5;

const fetchUserData = async () => {
  try {
    await usersStore.fetchLoggedInUser();
  } catch (error) {
    console.error(error);
  }
};

const startExerciseSequence = () => {
    if (exercises.value.length === 0) return;

    const nextExercise = () => {
        if (currentExerciseIndex.value < exercises.value.length) {
            isExerciseActive.value = true;
            isBreak.value = false;
            countdown.value = exerciseDuration;

            if (countdownInterval.value) clearInterval(countdownInterval.value);
            countdownInterval.value = setInterval(() => {
                if (countdown.value > 0) {
                    countdown.value--;
                } else {
                    isExerciseActive.value = false;
                    isBreak.value = true;
                    clearInterval(countdownInterval.value!);
                    startBreak();
                }
            }, 1000);
        }
    };

    nextExercise();
};

let isChallengeComplete = false;

const startBreak = () => {
    countdown.value = breakDuration;
    if (countdownInterval.value) clearInterval(countdownInterval.value);

    countdownInterval.value = setInterval(() => {
        if (countdown.value > 0) {
            countdown.value--;
        } else {
            currentExerciseIndex.value++;
            isBreak.value = false;
            if (currentExerciseIndex.value < exercises.value.length) {
                startExerciseSequence();
            } else {
                if (!isChallengeComplete) {
                    isComplete.value = true;
                    completeCategoryOrChallenge();
                    isChallengeComplete = true;
                }
            }
        }
    }, 1000);
};

const userHasCompletedPlan = computed(() => {
  const categories = usersStore.user?.categories_completed;
  const userId = usersStore.user?.id;
  const categoryId = route.params.id;

  try {
    if (!userId || !categoryId) {
      return false;
    }

    if (isDailyChallenge) {
      const dailyChallenge = dailyChallengeStore.dailyChallenge;
      if (dailyChallenge && dailyChallenge.users) {
        return dailyChallenge.users.includes(userId);
      }
      return false;
    }
  
    return categories ? JSON.parse(categories).includes(categoryId) : false;
  } catch (error) {
    console.error("Error checking completion status:", error);
    return false;
  }
});

const completeCategoryOrChallenge = async () => {
  const userId = usersStore.user?.id;
  if (!userId) {
    console.error("User ID is undefined");
    return;
  }

  try {
    if (isDailyChallenge) {
      await dailyChallengeStore.fetchDailyChallenge();
      const dailyChallenge = dailyChallengeStore.dailyChallenge;
      
      if (dailyChallenge) {
        await usersStore.updatePoints()
        await dailyChallengeStore.completeDailyChallenge(Number(userId));
      }
    } else {
      const categoriesCompleted = usersStore.user?.categories_completed
        ? JSON.parse(usersStore.user.categories_completed)
        : [];

      if (!categoriesCompleted.includes(categoryId)) {
        await usersStore.completeCategory(userId, categoryId);
      }
    }
  } catch (error) {
    console.error("Error completing category or challenge:", error);
  }
};

onMounted(async () => {
    try {
        await fetchUserData();
        if (isDailyChallenge) {
            await dailyChallengeStore.fetchDailyChallenge();
            let dailyChallenge = dailyChallengeStore.dailyChallenge;

            if (dailyChallenge) {
                categoryPoints.value = dailyChallenge.points;
                categoryName.value = `Daily Challenge: ${new Date(dailyChallenge.date).toLocaleDateString()}`;
                exercises.value = dailyChallenge.exercises || [];
            } else {
                console.error('No daily challenge found or created.');
            }
        } else {
            await categoriesStore.fetchCategory(Number(categoryId));
            await exercisesStore.fetchExercisesByCategoryID(Number(categoryId));

            const category = categoriesStore.category;
            if (category) {
                categoryName.value = category.name;
                categoryPoints.value = category.points;
            }

            exercises.value = exercisesStore.exercisesByCategory || [];
        }
    } catch (error) {
        console.error('Error fetching category or exercises: ', error);
    }
});
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard :title="categoryName" class="text-center justify-content-center">
                <div class="mb-10">
                    <p v-if="isExerciseActive" class="text-h5">
                        Exercise: {{ exercises[currentExerciseIndex]?.name }}
                    </p>
                    <p v-if="isExerciseActive" class="text-body-1"><br>
                        {{ exercises[currentExerciseIndex]?.description }}
                    </p>
                    <v-img v-if="isExerciseActive" :src="exercises[currentExerciseIndex]?.image" height="400px" width="auto" class="mb-6 mx-auto"/>
          
                    <p v-else-if="isBreak" class="text-body-1">
                        Break Time! Rest for {{ countdown }} seconds.
                    </p>
                    <p v-if="isExerciseActive" class="text-body-1">
                        Time Remaining: {{ countdown }} seconds
                    </p>
                </div>

                <div v-if="isComplete" class="mb-10">
                    <p class="text-body-1">
                        Congratulations! You've completed {{ categoryName }}. Keep up the good work!
                    </p>
                    <p v-if="!userHasCompletedPlan" class="text-body-1">
                        You've gained {{ categoryPoints }} point(s).
                    </p>
                </div>

                <v-btn v-if="!isExerciseActive && !isBreak && !isComplete" color="primary" @click="startExerciseSequence">
                    Start Exercise
                </v-btn>
                <v-btn v-else-if="!isComplete" color="primary" disabled>
                    Exercise In Progress
                </v-btn>
                <v-btn v-else color="primary" to="/dashboard">
                    Finish
                </v-btn>
            </UiParentCard>
        </v-col>
    </v-row>
</template>