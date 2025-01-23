import { createRouter, createWebHistory } from 'vue-router';
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';
import { useUsersStore } from '@/stores/usersStore'; 

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/auth/Error.vue')
        },
        MainRoutes,
        AuthRoutes
    ]
});

router.beforeEach((to, from, next) => {
    const usersStore = useUsersStore();
    
    if (to.meta.requiresAuth && !usersStore.isAuthenticated) {
        next({ name: 'Login' });
    } else {
        next();
    }
});