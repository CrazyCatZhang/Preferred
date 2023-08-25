import request from '@/utils/request.ts'
import type {
    loginForm,
    loginResponseData,
    userInfoResponseData,
} from '@/api/user/type.ts'

enum API {
    LOGIN_URL = '/admin/acl/index/login',
    USERINFO_URL = '/admin/acl/index/info',
    LOGOUT_URL = '/admin/acl/index/logout',
}

const login = (data: loginForm) =>
    request.post<any, loginResponseData>(API.LOGIN_URL, data)

const getUserInfo = () =>
    request.get<any, userInfoResponseData>(API.USERINFO_URL)

const logout = () => request.post<any, any>(API.LOGOUT_URL)

export { login, getUserInfo, logout }
