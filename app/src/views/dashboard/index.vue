<script setup lang="ts">
/*Call Components*/
import WelcomeUser from '@/components/dashboard/WelcomeUser.vue';
import DailyChallengeCard from '@/components/dashboard/DailyChallengeCard.vue';
import PointsUser from '@/components/dashboard/PointsUser.vue';
import TitleUser from '@/components/dashboard/TitleUser.vue';
import CategoriesUser from '@/components/dashboard/CategoriesUser.vue';
import { useDailyChallengeStore } from '@/stores/dailyChallengeStore';
const dailyChallengeStore = useDailyChallengeStore();
dailyChallengeStore.subscribeToDailyChallenge();
</script>

<template>
    <v-row class="h-100">
        <v-col cols="12" md="4">
            <WelcomeUser></WelcomeUser>
        </v-col>
        <v-col cols="12" md="8">
            <DailyChallengeCard></DailyChallengeCard>
        </v-col>
        <v-col cols="12" class="d-flex flex-row">
            <PointsUser class="mr-4" />
            <TitleUser class="mr-4"/>
            <CategoriesUser />
        </v-col>
    </v-row>
</template>
