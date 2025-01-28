<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { useUsersStore } from '@/stores/usersStore';
import { onMounted, computed } from 'vue';

const usersStore = useUsersStore();
const fetchUserData = async () => {
    try {
        await usersStore.fetchLoggedInUser();
        await usersStore.updateTitle()
    } catch (error) {
        console.error(error);
    }
};

const userTitle = computed(() => usersStore.user?.title || "");

onMounted(() => {
    fetchUserData();
});
</script>

<template>
    <v-card elevation="10" class="bg-lightsecondary p-4 pb-8">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-3">
                <div class="d-flex align-center">
                    <div class="rounded-pill d-inline-flex px-4 py-2 align-center bg-secondary">
                        <Icon icon="solar:health-bold-duotone" width="25" height="25" class="text-white" />
                    </div>
                    <v-card-title class="text-h6 textSecondary font-weight-medium mb-0 ms-3">
                        Type of user
                    </v-card-title>
                </div>
            </div>
            <div class="d-flex flex-column align-center text-h5 font-weight-medium textSecondary mt-8 text-center">
                <span class="text-secondary">{{ userTitle }}</span>
            </div>
        </v-card-item>
    </v-card>
</template>

<style scoped>
.bg-lightprimary {
    background-color: #e8f5e9;
}
.bg-lightsecondary {
    background-color: #fce4ec;
}
.bg-primary {
    background-color: #66bb6a;
}
.bg-secondary {
    background-color: #ec407a;
}
.textSecondary {
    color: #424242;
}
.text-muted {
    color: #6c757d;
}
</style>