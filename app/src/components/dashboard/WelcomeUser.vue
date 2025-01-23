<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { useUsersStore } from '@/stores/usersStore';
import { onMounted, computed } from 'vue';

const usersStore = useUsersStore();
const fetchUserData = async () => {
    try {
        await usersStore.fetchLoggedInUser();
    } catch (error) {
        console.error(error);
    }
};

const userName = computed(() => usersStore.user?.name || "");

onMounted(() => {
    fetchUserData();
});
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
                        Welcome back, <span class="font-weight-bold">{{ userName }}</span>
                    </v-card-title>
                </div>
            </div>
            <div class="d-flex align-center text-h6 font-weight-medium textSecondary mt-6">
                Remember, consistency is key! Keep stretching, keep breathing, and enjoy every step of your yoga journey.
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