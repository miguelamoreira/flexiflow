<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useDailyChallengeStore } from '@/stores/dailyChallengeStore';
import { useUsersStore } from '@/stores/usersStore';

const dailyChallengeCard = {
  title: 'Your Daily Yoga Challenge Awaits!',
  image: new URL('../../assets/bg_daily.jpg', import.meta.url).href,
  duration: '15 min',
  category: 'All Levels',
  link: '/plans/daily-challenge',
};

const dailyChallengeStore = useDailyChallengeStore();
const usersStore = useUsersStore();
const challengeCompleted = ref(false);

onMounted(async () => {
    await dailyChallengeStore.fetchDailyChallenge();

    if (dailyChallengeStore.dailyChallenge) {
        const userId = usersStore.user?.id;

        let completedUsers: string[] = [];
        try {
            completedUsers = JSON.parse(dailyChallengeStore.dailyChallenge.users);
        } catch (error) {
            console.error('Error parsing users: ', error);
        }

        if (userId && completedUsers.map(String).includes(userId.toString())) {
        challengeCompleted.value = true;
        }
    } else {
        challengeCompleted.value = false;
    }
});
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10" rounded="md" class="card-hover">
                <div>
                    <v-img :src="dailyChallengeCard.image" height="250px" cover class="rounded-t-md align-end text-right">
                        <v-card-item>
                            <v-chip class="bg-surface text-body-2 font-weight-medium" size="small" rounded="pill" v-text="dailyChallengeCard.duration"></v-chip>
                        </v-card-item>
                    </v-img>
                    <v-card-item class="pt-4">
                        <v-chip class="text-body-2 font-weight-medium bg-grey100" size="small" rounded="pill" v-text="dailyChallengeCard.category"></v-chip>
                        <h5 class="text-h5 text-13 my-6 custom-text-primary">
                            {{ dailyChallengeCard.title }}
                        </h5>
                        <p class="text-body-1 textSecondary mb-4">
                            Start today, take the first step on your path to wellness. Feel stronger, more balanced, and empowered. Your yoga journey begins now!
                        </p>
                        <RouterLink v-if="!challengeCompleted" :to="dailyChallengeCard.link">
                            <v-btn elevation="1" class="mb-2" color="primary">
                                <span class="textPrimary">Accept the Challenge</span>
                            </v-btn>
                        </RouterLink>
                        <v-btn v-else elevation="1" class="mb-2" disabled>
                            <span class="textPrimary">Challenge Completed</span>
                        </v-btn>
                    </v-card-item>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>

<style scoped>
.custom-text-primary {
    color: #66bb6a;
}

.textSecondary {
    color: #6c757d;
}
</style>