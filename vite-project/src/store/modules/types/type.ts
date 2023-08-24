import { RouteRecordRaw } from 'vue-router'

interface UserState {
    token: null | string
    menuRoutes: RouteRecordRaw[]
    username: string
    avatar: string
}

export type { UserState }
