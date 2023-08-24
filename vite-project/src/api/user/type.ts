interface loginForm {
    username: string
    password: string
}

interface loginResponseData {
    code: number
    data: {
        token?: string
        message?: string
    }
}

interface userInfo {
    userId: number
    avatar: string
    username: string
    password: string
    desc: string
    roles: string[]
    buttons: string[]
    routes: string[]
    token: string
}

interface userResponseData {
    code: number
    data: {
        checkUser: userInfo
    }
}

export type { loginForm, loginResponseData, userResponseData }
