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

hrApiService.interceptors.request.use((config) => {
    const url = config.url || ""
    const isPublic = HR_PUBLIC.some(route => url.includes(route))
    console.log("HR INTERCEPTOR:", url, "isPublic:", isPublic, "token:", localStorage.getItem("HRtoken")?.slice(0, 20))
    if (!isPublic) {
        const token = localStorage.getItem("HRtoken")
        if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
