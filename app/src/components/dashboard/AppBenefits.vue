<script setup lang="ts">
import { Icon } from '@iconify/vue';

const appBenefits = ["Improve Flexibility and Strength", "Reduce Stress with Guided Meditation", "Track Health Metrics in Real-Time"];
</script>

<template>
    <v-card elevation="10" class="bg-lightsecondary p-4">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-3">
                <div class="d-flex align-center">
                    <div class="rounded-pill d-inline-flex px-4 py-2 align-center bg-secondary">
                        <Icon icon="solar:health-bold-duotone" width="25" height="25" class="text-white" />
                    </div>
                    <v-card-title class="text-h6 textSecondary font-weight-medium mb-0 ms-3">
                        App Benefits:
                    </v-card-title>
                </div>
            </div>
            <div>
                <ul class="text-muted">
                    <li v-for="benefit in appBenefits" :key="feature" class="mb-1">
                        <Icon icon="solar:check-circle-bold-duotone" width="20" height="20" class="me-2 text-secondary" />
                        {{ benefit }}
                    </li>
                </ul>
            </div>
        </v-card-item>
    </v-card>
</template>

<style scoped>
.bg-lightprimary {
    background-color: #e8f5e9;
}
.bg-primary {
    background-color: #66bb6a;
}
.textSecondary {
    color: #424242;
}
.text-muted {
    color: #6c757d;
}
</style>