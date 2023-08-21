import { RouteRecordRaw } from 'vue-router'

interface UserState {
    token: null | string
    menuRoutes: RouteRecordRaw[]
}

export type {
    UserState
}