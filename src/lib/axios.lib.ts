import axios from "axios";
import type { ConsultationResult } from '../types/index';

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
    logout: () => authServerAxios.get('/auth/logout'),
    loginWithGoogle: () => {
        window.location.href = `${import.meta.env.VITE_SERVER_BASE_URL}/auth/google`
    }
}

// Consultation APIs (protected – needs JWT cookie)
export const consultationAPI = {
    consult: (params: string) =>
        authServerAxios.get<ConsultationResult>(`/api/doctor-consult?${params.toString()}`),
}