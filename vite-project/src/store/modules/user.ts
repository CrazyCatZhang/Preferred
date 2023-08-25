import { defineStore } from 'pinia'
import { login, getUserInfo, logout } from '@/api/user'
import type {
    loginForm,
    loginResponseData,
    userInfoResponseData,
} from '@/api/user/type.ts'
import type { UserState } from '@/store/modules/types/type.ts'
import { getToken, removeToken, setToken } from '@/utils/token.ts'
import { constantRoutes } from '@/router/routes.ts'

const useUserStore = defineStore('User', {
    state(): UserState {
        return {
            token: getToken(),
            menuRoutes: constantRoutes,
            username: '',
            avatar: '',
        }
    },
    actions: {
        async userLogin(data: loginForm) {
            const result: loginResponseData = await login(data)
            if (result.code === 200) {
                this.token = result.data as string
                setToken(result.data as string)
                return 'OK'
            } else {
                return Promise.reject(new Error(result.data as string))
            }
        },
        async userInfo() {
            const result: userInfoResponseData = await getUserInfo()
            if (result.code === 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'OK'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        async userLogout() {
            //退出登录请求
            const result: any = await logout()
            if (result.code == 200) {
                //目前没有mock接口:退出登录接口(通知服务器本地用户唯一标识失效)
                this.token = ''
                this.username = ''
                this.avatar = ''
                removeToken()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
    },
    getters: {},
})

export default useUserStore
