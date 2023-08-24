const setToken = (token: string) => {
    localStorage.setItem('TOKEN', token)
}

const getToken = (): null | string => {
    return localStorage.getItem('TOKEN')
}

const removeToken = () => {
    localStorage.removeItem('TOKEN')
}

export { setToken, getToken, removeToken }
