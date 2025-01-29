<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useUsersStore } from '@/stores/usersStore';
import { onMounted, computed } from 'vue';

const usersStore = useUsersStore();
var userPoints = usersStore.user.total_points;
const fetchUserData = async () => {
    try {
        console.log(usersStore.user.total_points);
        
        if(!usersStore.user){
            await usersStore.fetchLoggedInUser();
        }
        console.log(usersStore.user.total_points)
        userPoints = usersStore.user.total_points
        console.log(userPoints);
        
    } catch (error) {
        console.error(error);
    }
};


onMounted(() => {
    fetchUserData();
});
</script>

<template>
    <v-card elevation="10" class="bg-lightprimary p-4">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-3">
                <div class="d-flex align-center">
                    <div class="rounded-pill d-inline-flex px-4 py-2 align-center bg-primary">
                        <Icon icon="solar:stars-minimalistic-bold" width="25" height="25" class="text-lightprimary" />
                    </div>
                    <v-card-title class="text-h6 textSecondary font-weight-medium mb-0 ms-3">
                        Total points
                    </v-card-title>
                </div>
            </div>
            <div class="d-flex flex-column align-center text-h5 font-weight-medium textSecondary mt-8 text-center">
                <span class="ms-2 text-primary">{{ userPoints }} points</span>
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