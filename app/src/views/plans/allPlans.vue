<script setup lang="ts">
import { ref } from 'vue';
import PlanCards from '@/components/plans/PlanCards.vue';
</script>
<template>
    <v-row>
        <v-col cols="12" md="12">
            <p class="text-h3 mb-6">All plans</p>
            <PlanCards></PlanCards>
        </v-col>
    </v-row>
</template>
