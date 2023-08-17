import { defineStore } from 'pinia'
import { login } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type.ts'
import { UserState } from '@/store/modules/types/type.ts'
import { getToken, setToken } from '@/utils/token.ts'

const useUserStore = defineStore('User', {
    state(): UserState {
        return {
            token: getToken(),
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
    },
    getters: {},
})

export default useUserStore