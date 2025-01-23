<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logoiconimg from '@/assets/logoIcon.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/dashboard">
            <img :src="Logoiconimg" alt="home" />
        </RouterLink>
    </div>
</template>