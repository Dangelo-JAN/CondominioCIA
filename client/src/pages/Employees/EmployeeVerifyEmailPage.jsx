import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { HandleEmployeeVerifyEmail } from "../../redux/Thunks/EmployeeThunk.js"
import { clearEmployeeAuthState } from "../../redux/Slices/EmployeeSlice.js"
import LoadingBar from "react-top-loading-bar"
import { Mail, Copy, CheckCircle2 } from "lucide-react"
import { Verify_Email_Component } from "../../components/common/verify-email.jsx"

export const EmployeeVerifyEmailPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [verificationcode, setverificationcode] = useState("")
    const [status, setStatus] = useState("idle") // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("")
    
    // El código de verificación viene desde el backend al crear el empleado
    // No lo almacenamos en localStorage por seguridad - el usuario debe ingresarlo

    const handleCodeValue = (value) => {
        setverificationcode(value)
    }

    const handleOTPsubmit = async () => {
        if (!verificationcode || verificationcode.length !== 6) {
            setErrorMsg("Por favor ingresa el código de 6 dígitos")
            return
        }

        setStatus("loading")
        setErrorMsg("")
        loadingbar.current?.continuousStart()

        try {
            const result = await dispatch(HandleEmployeeVerifyEmail(verificationcode))
            
            if (result.payload?.success) {
                loadingbar.current?.complete()
                setStatus("success")
                // Limpiar estado Redux para evitar redirecciones automáticas al login
                dispatch(clearEmployeeAuthState())
                setTimeout(() => {
                    // Usar replace para evitar que quede en historial y cause loops
                    navigate("/auth/employee/login", { replace: true })
                }, 2000)
            } else {
                setErrorMsg(result.payload?.message || "Código inválido o expirado")
                setStatus("error")
                loadingbar.current?.complete()
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.message || "Error al verificar el correo")
            setStatus("error")
            loadingbar.current?.complete()
        }
    }

    return (
        <>
            <LoadingBar ref={loadingbar} />

            {status === "success" ? (
                <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-[#0f0f1a]">
                    <div className="w-full max-w-md text-center">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-emerald-50 dark:bg-[rgba(16,185,129,0.1)]">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                            ¡Correo verificado!
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Ahora puedes iniciar sesión con tu contraseña
                        </p>
                    </div>
                </div>
            ) : (
                <>
                    <Verify_Email_Component
                        handleCodeValue={handleCodeValue}
                        value={verificationcode}
                        handleOTPsubmit={handleOTPsubmit}
                    />

                    {errorMsg && (
                        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm mx-4">
                            <div className="rounded-xl p-3 flex items-center gap-2
                                bg-red-50 border border-red-100 text-red-600
                                dark:bg-[rgba(239,68,68,0.1)] dark:border-[rgba(239,68,68,0.2)] dark:text-red-400">
                                <span className="text-sm">{errorMsg}</span>
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    )
}