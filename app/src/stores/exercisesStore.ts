import { fetchExercise, fetchExercises, fetchExercisesByCategoryID } from '@/api/exercisesApi';
import { defineStore } from 'pinia';

export interface exercise {
    id: string;
    name: string;
    description: string;
    category_id: number;
}

interface exerciseState {
    exercises: exercise[];
    exercise: exercise | null;
    exercisesByCategory: exercise[];
    loading: boolean;
    error: string | null;
}
export const useExercisesStore = defineStore('exercises', {
    state: (): exerciseState => ({
        exercises: [],
        exercise: null,
        exercisesByCategory: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchExercises() {
            this.loading = true;
            this.error = null;
            try {
                const exercises = await fetchExercises();
                this.exercises = exercises;
            } catch (error) {
                this.error = 'Failed to fetch exercises';
                console.error('Error fetching exercises: ', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchExercise(id:number) {
            this.loading = true;
            this.error = null;
            try {
                const exercise = await fetchExercise(id);
                this.exercise = exercise;
            } catch (error) {
                this.error = `Failed to fetch exercise with ID ${id}`;
                console.error('Error fetching exercise: ', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchExercisesByCategoryID(id:number) {
            this.loading = true;
            this.error = null;
            try {
                const exercises = await fetchExercisesByCategoryID(id);
                this.exercisesByCategory = exercises;
            } catch (error) {
                this.error = `Failed to fetch exercises with ID ${id}`;
                console.error('Error fetching exercise: ', error);
            } finally {
                this.loading = false;
            }
        }
    }
});
