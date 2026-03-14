import axios from 'axios'

const HR_PUBLIC = [
    "/api/auth/HR/login",
    "/api/auth/HR/signup",
    "/api/auth/HR/forgot-password",
    "reset-password",
]

export const hrApiService = axios.create({
    baseURL: import.meta.env.VITE_EMPLOYEE_API,
    headers: { 'Content-Type': 'application/json' },
})

hrApiService.interceptors.request.use((config) => {
    const url = config.url || ""
    const isPublic = HR_PUBLIC.some(route => url.includes(route))
    if (!isPublic) {
        const token = localStorage.getItem("HRtoken")
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
