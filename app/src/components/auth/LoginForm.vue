<script setup lang="ts">
import { ref } from 'vue';
const checkbox = ref(true);
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Username</v-label>
            <v-text-field variant="outlined" density="compact" hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Password</v-label>
            <v-text-field variant="outlined"  density="compact" type="password"   hide-details color="primary"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-8">
            <v-btn to="/" rounded="md" color="primary" size="large" block   flat>Sign in</v-btn>
        </v-col>
    </v-row>
</template>
