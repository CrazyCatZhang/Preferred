const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token)
}

const getToken = (): null | string => {
    return localStorage.getItem('TOKEN')
}

export {
    setToken,
    getToken
}