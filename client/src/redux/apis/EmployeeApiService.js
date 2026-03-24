import axios from 'axios'

const EM_PUBLIC = [
    "/api/auth/employee/login",
    "/api/auth/employee/signup",
    "/api/auth/employee/forgot-password",
    "reset-password",
]

export const employeeApiService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    headers: { 'Content-Type': 'application/json' },
})

employeeApiService.interceptors.request.use((config) => {
    const url = config.url || ""
    const isPublic = EM_PUBLIC.some(route => url.includes(route))
    if (!isPublic) {
        const token = localStorage.getItem("EMtoken")
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
