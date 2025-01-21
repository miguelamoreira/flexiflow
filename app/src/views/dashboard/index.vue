<script setup lang="ts">
/*Call Components*/
import RevenueCard from '@/components/dashboard/RevenueCard.vue';
import KeyFeatures from '@/components/dashboard/KeyFeatures.vue';
import AppBenefits from '@/components/dashboard/AppBenefits.vue';
import RevenueProduct from '@/components/dashboard/RevenueProducts.vue';
import PlanCards from '@/components/dashboard/PlanCards.vue';
import EarningReports from '@/components/dashboard/EarningReports.vue';
</script>

<template>
    <v-row>
        <v-col cols="12" md="8"><RevenueCard /></v-col>
        <v-col cols="12" md="4">
            <KeyFeatures class="mb-6" />
            <AppBenefits />
        </v-col>
        <v-col cols="12"><PlanCards /></v-col>

    </v-row>

</template>
