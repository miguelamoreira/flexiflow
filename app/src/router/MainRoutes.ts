const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        {
            name: 'Dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/index.vue')
        },
        {
            name: 'All Plans',
            path: '/plans/all-plans',
            component: () => import('@/views/plans/allPlans.vue')
        },
        {
            name: 'Plan',
            path: `/plans/:id`,
            component: () => import('@/views/plans/plan.vue')
        }
    ]
};

export default MainRoutes;
