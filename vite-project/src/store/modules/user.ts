import { defineStore } from 'pinia'
import { login, getUserInfo } from '@/api/user'
import type {
    loginForm,
    loginResponseData,
    userResponseData,
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
                this.token = result.data.token as string
                setToken(result.data.token as string)
                return 'OK'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        async userInfo() {
            const result: userResponseData = await getUserInfo()
            console.log(result)
            if (result.code === 200) {
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                return 'OK'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        userLogout() {
            this.token = ''
            this.username = ''
            this.avatar = ''
            removeToken()
        },
    },
    getters: {},
})

export default useUserStore
