import axios from 'axios';

const API = axios.create({
    baseUrl: 'http://localhost:5000',
    withCredentials:true
})

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            document.cookie = 'token=; expire=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
            window.location.href='/login'
        }
        return Promise.reject(error)
    }
)

export default API;