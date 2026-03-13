import axios from 'axios'

export const apiService = axios.create({
    baseURL: import.meta.env.VITE_EMPLOYEE_API,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Interceptor: agrega el token correcto en cada request automáticamente
apiService.interceptors.request.use((config) => {
    // Detecta si la ruta es de HR o de Employee por la URL
    const url = config.url || ""
    const isHR = url.includes("/api/auth/HR") || url.includes("/api/v1/") && !url.includes("/api/auth/employee")

    // Rutas de autenticación que NO necesitan token
    const isAuthRoute =
        url.includes("/api/auth/employee/login") ||
        url.includes("/api/auth/employee/signup") ||
        url.includes("/api/auth/HR/login") ||
        url.includes("/api/auth/HR/signup") ||
        url.includes("/api/auth/HR/check") ||
        url.includes("/api/auth/employee/check") ||
        url.includes("forgot-password") ||
        url.includes("resetpassword") ||
        url.includes("verify-email")

    if (!isAuthRoute) {
        // Intenta HR primero, luego Employee
        const hrToken  = localStorage.getItem("HRtoken")
        const emToken  = localStorage.getItem("EMtoken")
        const token    = hrToken || emToken

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }

    return config
})
