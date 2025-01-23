<script setup lang="ts">
const dailyChallengeCard = {
  title: 'Your Daily Yoga Challenge Awaits!',
  coveravatar: 'https://via.placeholder.com/250x150.png?text=Daily+Challenge',
  duration: '1 Day',
  category: 'All Levels',
  link: '/challenge/daily-yoga',
};
</script>

<template>
    <v-row>
        <v-col cols="12">
            <v-card elevation="10" rounded="md" class="card-hover">
                <div>
                    <v-img :src="dailyChallengeCard.coveravatar" height="250px" cover class="rounded-t-md align-end text-right">
                        <v-card-item>
                            <v-chip class="bg-surface text-body-2 font-weight-medium" size="small" rounded="pill" v-text="dailyChallengeCard.duration"></v-chip>
                        </v-card-item>
                    </v-img>
                    <v-card-item class="pt-4">
                        <v-chip class="text-body-2 font-weight-medium bg-grey100" size="small" rounded="pill" v-text="dailyChallengeCard.category"></v-chip>
                        <h5 class="text-h5 text-13 my-6 custom-text-primary">
                            <RouterLink class="text-decoration-none color-inherits custom-title" :to="dailyChallengeCard.link">{{ dailyChallengeCard.title }}</RouterLink>
                        </h5>
                        <p class="text-body-1 textSecondary mb-4">
                            Start today, take the first step on your path to wellness. Feel stronger, more balanced, and empowered. Your yoga journey begins now!
                        </p>
                        <v-btn elevation="1" class="mb-2" color="primary">Accept the Challenge</v-btn>
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