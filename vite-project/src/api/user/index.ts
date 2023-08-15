import request from '@/utils/request.ts'
import type {
    loginForm,
    loginResponseData,
    userResponseData,
} from '@/api/user/type.ts'

enum API {
    USER_LOGIN_URL = '/user/login',
    USERINFO_URL = '/user/info',
}

const login = (data: loginForm) =>
    request.post<any, loginResponseData>(API.USER_LOGIN_URL, data)

const getUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)

export { login, getUserInfo }