import axios from "axios";

export const authServerAxios = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_BASE_URL}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Auth APIs
export const authAPI = {
    getProfile: () => authServerAxios.get('/user/profile'),
    verifyToken: () => authServerAxios.get('/auth/verify'),
    logout: () => authServerAxios.post('/auth/logout'),
    loginWithGoogle: () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }
}