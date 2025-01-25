<script setup lang="ts">
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
    <div class="d-flex flex-column align-start">
        <h1 class="text-h1 font-weight-bold textPrimary" > 
            Welcome back, <span class="text-primary">{{ userName }}</span>
        </h1>
        <p class="text-h6 mt-2 textSecondary">
            Remember, consistency is key! Keep stretching, keep breathing, and enjoy every step of your yoga journey.
        </p>
    </div>
</template>