<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/usersStore';

const email = ref('');
const password = ref('');
const usersStore = useUsersStore();
const router = useRouter()

const login = async () => {
    try {
        await usersStore.login(email.value, password.value);

        if (usersStore.isAuthenticated) {
            router.push('/dashboard');
        }
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">E-mail</v-label>
            <v-text-field v-model="email" variant="outlined" density="compact" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined"  density="compact" type="password"   hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-8">
            <v-btn @click="login" rounded="md" color="primary" size="large" block   flat>Sign in</v-btn>
        </v-col>
    </v-row>
</template>
