import { fetchCategories, fetchCategory } from '@/api/categoriesApi';
import { defineStore } from 'pinia';

export interface category {
    id: string;
    name: string;
    description: string;
    min_points: number;
    points: number;
}

interface categoriesState {
    categories: category[];
    category: category | null;
    loading: boolean;
    error: string | null;
}

export const useCategoriesStore = defineStore('categories', {
    state: (): categoriesState => ({
        categories: [],
        category: null,
        loading: false,
        error: null
    }),

    actions: {
        async fetchAllCategories() {
            this.loading = true;
            this.error = null;
            try {
                const categories = await fetchCategories();
                this.categories = categories;
            } catch (error) {
                this.error = 'Failed to fetch categories';
                console.error('Error fetching categories: ', error);
            } finally {
                this.loading = false;
            }
        },
        async fetchCategory(id : number){
            this.loading = true;
            this.error = null;
            try {
                const category = await fetchCategory(id);
                this.category = category;
            } catch (error) {
                this.error = `Failed to fetch category with ID ${id}`;
                console.error('Error fetching category: ', error);
            } finally {
                this.loading = false;
            }
        }
    }
});
