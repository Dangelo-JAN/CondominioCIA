import axios from 'axios'

const HR_PUBLIC = [
    "/api/auth/HR/login",
    "/api/auth/HR/signup",
    "/api/auth/HR/forgot-password",
    "reset-password",
]

export const hrApiService = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API,
    headers: { 'Content-Type': 'application/json' },
})

// Interceptor para agregar headers anti-caché a todas las peticiones
hrApiService.interceptors.request.use((config) => {
    const url = config.url || ""
    const isPublic = HR_PUBLIC.some(route => url.includes(route))
    
    // Agregar token si no es ruta pública
    if (!isPublic) {
        const token = localStorage.getItem("HRtoken")
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    
    // Agregar query param anti-caché a peticiones GET para evitar 304
    if (config.method === 'get') {
        const separator = config.url.includes('?') ? '&' : '?'
        config.url = `${config.url}${separator}_t=${Date.now()}`
    }
    
    return config
})
