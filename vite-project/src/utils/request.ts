import axios from 'axios'
import { ElMessage } from 'element-plus'

const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 5000,
})

request.interceptors.request.use((config) => {
    return config
})

request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (err) => {
        let message = ''
        switch (err.response.status) {
            case 401:
                message = 'Token is invalid'
                break
            case 403:
                message = 'Not authorized to access'
                break
            case 404:
                message = 'Request url not found'
                break
            case 500:
                message = 'Internal Server Error'
                break
            default:
                message = 'Internet error'
        }
        ElMessage({
            type: 'error',
            message,
        })
        return Promise.reject(err)
    },
)

export default request
