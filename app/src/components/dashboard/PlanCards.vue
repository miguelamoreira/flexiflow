<script setup lang="ts">
import { PlanCardData } from '@/data/Dashboard';
</script>
<template>
    <v-row>
        <v-col cols="12" md="4" sm="6" v-for="card in PlanCardData" :key="card.title">
            <v-card elevation="10"  rounded="md" class="card-hover">
                <div>
                    <v-img :src="card.coveravatar" height="250px" cover class="rounded-t-md align-end text-right">
                        <v-card-item
                            ><v-chip class="bg-surface text-body-2 font-weight-medium" size="small" rounded="pill" v-text="card.duration"></v-chip
                        ></v-card-item>
                    </v-img>
                    <v-card-item class="pt-4">
                        <v-chip class="text-body-2 font-weight-medium bg-grey100" size="small" rounded="pill" v-text="card.category"></v-chip>
                        <h5 class="text-h5 text-13 my-6 custom-text-primary">
                            <RouterLink class="text-decoration-none color-inherits custom-title" :to="card.link">{{ card.title }}</RouterLink>
                        </h5>
                        <v-btn elevation="1" class="mb-2" color="primary">Start</v-btn>
                    </v-card-item>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>
