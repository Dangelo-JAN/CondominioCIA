import axios from 'axios'

export const apiService = axios.create({
    baseURL: import.meta.env.VITE_EMPLOYEE_API,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Rutas públicas que NO necesitan token
const PUBLIC_ROUTES = [
    "/api/auth/employee/login",
    "/api/auth/employee/signup",
    "/api/auth/employee/forgot-password",
    "/api/auth/HR/login",
    "/api/auth/HR/signup",
    "/api/auth/HR/forgot-password",
    "reset-password",
]

apiService.interceptors.request.use((config) => {
    const url = config.url || ""

    const isPublic = PUBLIC_ROUTES.some(route => url.includes(route))

    if (!isPublic) {
        const token = localStorage.getItem("HRtoken") || localStorage.getItem("EMtoken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})
