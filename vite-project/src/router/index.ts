import { createRouter, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes.ts'

export default createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
    scrollBehavior() {
        return {
            left: 0,
            top: 0,
        }
    },
})
