<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useExercisesStore } from '@/stores/exercisesStore';

const categoriesStore = useCategoriesStore();
const exercisesStore = useExercisesStore();

const route = useRoute();
const categoryId = route.params.id;
const categoryName = ref('');
const exercises = ref<any[]>([]);
const currentExerciseIndex = ref(0);

const isBreak = ref(false);
const isExerciseActive = ref(false);
const countdown = ref(0);
const countdownInterval = ref<ReturnType<typeof setInterval> | null>(null);
const exerciseDuration = 60;
const breakDuration = 30;

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

const startBreak = () => {
    setTimeout(() => {
        currentExerciseIndex.value++;
        isBreak.value = false;
        if (currentExerciseIndex.value < exercises.value.length) {
            startExerciseSequence();
        }
    }, breakDuration * 1000);
};

onMounted(async () => {
    try {
        await categoriesStore.fetchCategory(Number(categoryId));
        await exercisesStore.fetchExercisesByCategoryID(Number(categoryId));

        const category = categoriesStore.category;
        if (category) {
            categoryName.value = category.name;
        }

        exercises.value = exercisesStore.exercisesByCategory || [];
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
                    <v-img v-if="isExerciseActive" :src="exercises[currentExerciseIndex]?.image" height="400px" width="auto" class="mb-6 mx-auto"/>
                    <p v-else-if="isBreak" class="text-body-1">
                        Break Time! Rest for {{ countdown }} seconds.
                    </p>
                    <p v-if="isExerciseActive" class="text-body-1">
                        Time Remaining: {{ countdown }} seconds
                    </p>
                </div>

                <v-btn v-if="!isExerciseActive && !isBreak" color="primary" @click="startExerciseSequence">
                    Start Exercise
                </v-btn>
                <v-btn v-else color="primary" disabled>
                    Exercise In Progress
                </v-btn>
            </UiParentCard>
        </v-col>
    </v-row>
</template>