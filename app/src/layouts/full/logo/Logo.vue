<script setup lang="ts">
import { RouterLink } from 'vue-router';
import Logoimg from '@/assets/logo.svg';
</script>
<template>
    <div class="logo">
        <RouterLink to="/dashboard">
            <img :src="Logoimg" alt="home" />
        </RouterLink>
    </div>
</template>