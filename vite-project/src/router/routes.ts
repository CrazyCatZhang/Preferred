const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/Login/index.vue'),
        name: 'login',
        meta: {
            title: '登录', //菜单标题
            hidden: true, //代表路由标题在菜单中是否隐藏  true:隐藏 false:不隐藏
            icon: 'Promotion', //菜单文字左侧的图标,支持element-plus全部图标
        },
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'Layout',
        meta: {
            title: 'Layout',
            hidden: false,
            icon: '',
        },
        children: [
            {
                path: '/home',
                component: () => import('@/views/Home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled',
                },
            },
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'DocumentDelete',
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/404/index.vue'),
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'DataLine',
        },
    },
]

export { constantRoutes }
