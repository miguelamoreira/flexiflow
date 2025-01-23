<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '@/stores/usersStore';

const name = ref('');
const email = ref('');
const password = ref('');
const usersStore = useUsersStore();
const router = useRouter()

const createUser = async () => {
  try {
    await usersStore.createUser(name.value, email.value, password.value);
    if (!usersStore.error) {
      console.log("User created successfully.");
      router.push("/dashboard");
    } else {
      console.error("Error:", usersStore.error);
    }
  } catch (error) {
    console.error("Unexpected error:", error);
  }
};
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Name</v-label>
            <v-text-field v-model="name" variant="outlined" density="compact" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Email Address</v-label>
            <v-text-field v-model="email" variant="outlined" density="compact" type="email" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Password</v-label>
            <v-text-field v-model="password" variant="outlined" type="password" density="compact"  hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" >
            <v-btn @click="createUser" rounded="md" color="primary" size="large" block flat>Sign up</v-btn>
        </v-col>
    </v-row>
</template>
