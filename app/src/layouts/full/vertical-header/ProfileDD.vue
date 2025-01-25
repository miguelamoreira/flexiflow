<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/usersStore';

const usersStore = useUsersStore();
const router = useRouter()

const logout = () => {
    usersStore.logout();
    router.push('/');
}
</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn @click="logout" color="primary" variant="outlined" block>Logout</v-btn>
        </template>
    </v-menu>
</template>
