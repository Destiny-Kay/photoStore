import axios from 'axios'
import { ACCESS_TOKEN, GOOGLE_ACCESS_TOKEN } from '../constants/tokenVals'


const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 1000
})

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN)
        if (googleAccessToken) {
            config.headers['X-Google-Access-Token'] = googleAccessToken
        }
        return config
    },
    (err) => {
        return Promise.reject(err)
    }
)

apiClient.interceptors.response.use(
    (response) => {
        return response
    }, 
    (error) => {
        if (error.response && (error.response.status === 401 && error.response.status === 403)) {
            window.location.href = "/" //get user type from local storage and then redirect to the login page there
        }
        return Promise.reject(error)
    }
)

export default apiClient;
