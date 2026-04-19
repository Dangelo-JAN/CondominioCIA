import axios from 'axios'

const EM_PUBLIC = [
    "/api/auth/employee/login",
    "/api/auth/employee/signup",
    "/api/auth/employee/forgot-password",
    "/api/auth/employee/verify-email",
    "/api/auth/employee/resend-verify-email",
    "reset-password",
]

export const employeeApiService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    headers: { 'Content-Type': 'application/json' },
})

// Interceptor para agregar headers anti-caché a todas las peticiones
employeeApiService.interceptors.request.use((config) => {
    const url = config.url || ""
    const isPublic = EM_PUBLIC.some(route => url.includes(route))
    
    // Agregar token si no es ruta pública
    if (!isPublic) {
        const token = localStorage.getItem("EMtoken")
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    
    // Agregar query param anti-caché a peticiones GET para evitar 304
    if (config.method === 'get') {
        const separator = config.url.includes('?') ? '&' : '?'
        config.url = `${config.url}${separator}_t=${Date.now()}`
    }
    
    return config
})
