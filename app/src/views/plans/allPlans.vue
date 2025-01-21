<script setup lang="ts">
import { ref } from 'vue';
import UiParentCard from '@/components/shared/UiParentCard.vue';
import PlanCards from '@/components/dashboard/PlanCards.vue';
</script>
<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="All Plans"> 
                <PlanCards></PlanCards>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
