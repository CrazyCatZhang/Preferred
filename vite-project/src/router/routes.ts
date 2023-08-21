const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        name: 'login',
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'Layout',
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
        name: 'Any',
    },
]

export { constantRoutes }
