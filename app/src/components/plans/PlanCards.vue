<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '@/stores/categoriesStore';
import { useUsersStore } from '@/stores/usersStore';
import { useExercisesStore } from '@/stores/exercisesStore';

type PlanCards = {
    id: string;
    cover: string;
    duration: string;
    title: string;
    link: string;
    category: string;
    isActive: boolean;
    description: string;
};

const categoriesStore = useCategoriesStore();
const usersStore = useUsersStore();
const exercisesStore = useExercisesStore();
const planCards = ref<PlanCards[]>([]);

onMounted(async () => {
    try {
        await categoriesStore.fetchAllCategories();
        await usersStore.fetchLoggedInUser();

        const completedCategoriesRaw = usersStore.user?.categories_completed || [];
        const completedCategories = typeof completedCategoriesRaw === "string"
            ? JSON.parse(completedCategoriesRaw).map(Number)
            : completedCategoriesRaw.map(Number);

        const maxCompletedCategoryID = Math.max(0, ...completedCategories);

        planCards.value = await Promise.all(
            categoriesStore.categories.map(async (category) => {
                const exercises = await exercisesStore.fetchExercisesByCategoryID(Number(category.id));

                const isCompleted = completedCategories.includes(Number(category.id));
                const isNextCategory = Number(category.id) === maxCompletedCategoryID + 1;

                const isActive = isCompleted || isNextCategory;

                return {
                    id: category.id,
                    cover: exercises && exercises.length > 0 ? exercises[0].image : '',
                    duration: "15 min",
                    title: category.name,
                    link: `/plans/${category.id}`,
                    category: category.name,
                    isActive: isActive,
                    description: category.description
                };
            })
        );
    } catch (err) {
        console.error("Error fetching categories or user: ", err);
    }
});
</script>

<template>
    <v-row>
        <v-col v-for="card in planCards" :key="card.id" cols="12" md="4" sm="6">
            <v-card elevation="10" rounded="md" class="card-hover" height="520">
                <div>
                    <v-img :src="card.cover" height="250px" cover class="rounded-t-md align-end text-right">
                        <v-card-item>
                            <v-chip class="bg-surface text-body-2 font-weight-medium" size="small" rounded="pill" v-text="card.duration"></v-chip>
                        </v-card-item>
                    </v-img>
                    <v-card-item class="pt-4">
                        <v-chip class="text-body-2 font-weight-medium bg-grey100" size="small" rounded="pill" v-text="card.category"></v-chip>
                        <h5 class="text-h5 text-13 my-2 mt-6 custom-text-primary">
                            {{ card.title }}
                        </h5>
                        <p class="text-body-2 mb-4">{{ card.description }}</p>
                        <RouterLink v-if="card.isActive" :to="card.link">
                            <v-btn elevation="1" class="mb-2" color="primary">Start</v-btn>
                        </RouterLink>
                        <v-btn v-else elevation="1" class="mb-2" color="grey" disabled>
                            Not Enough Points
                        </v-btn>
                    </v-card-item>
                </div>
            </v-card>
        </v-col>
    </v-row>
</template>