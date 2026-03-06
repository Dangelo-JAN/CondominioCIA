import { Verify_Email_Component } from "../../components/common/verify-email.jsx"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostHumanResources, HandleGetHumanResources } from "../../redux/Thunks/HRThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'

export const VerifyEmailPage = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [verificationcode, setverificationcode] = useState("")

    const handleCodeValue = (value) => {
        setverificationcode(value)
    }

    const handleOTPsubmit = () => {
        // Encadenamiento opcional para evitar crash
        loadingbar.current?.continuousStart();
        dispatch(HandlePostHumanResources({ apiroute: "VERIFY_EMAIL", data: { verificationcode: verificationcode } }))
    }

    // EFECTO 1: Control de errores para detener la barra
    useEffect(() => {
        if (HRState.error?.status) {
            loadingbar.current?.complete()
        }
    }, [HRState.error])

    // EFECTO 2: Lógica de navegación y verificación
    useEffect(() => {
        // 1. Verificación inicial si no está verificado
        if (!HRState.isVerified) {
            dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
        }

        // 2. Redirección si el código expiró o no está disponible (con protección opcional ?.)
        if (!HRState.isVerified && !HRState.isVerifiedEmailAvailable && HRState.error?.content) {
            loadingbar.current?.complete()
            navigate("/auth/HR/reset-email-validation")
        }

        // 3. Éxito en la verificación
        if (HRState.isVerified) {
            loadingbar.current?.complete()
            navigate("/auth/HR/dashboard") 
        }
    }, [HRState.isVerified, HRState.isVerifiedEmailAvailable, HRState.error, navigate, dispatch])

    // EFECTO 3: Limpieza al desmontar
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    return (
        <>
            <LoadingBar color='#f11946' ref={loadingbar} />
            <Verify_Email_Component 
                handleCodeValue={handleCodeValue} 
                value={verificationcode} 
                handleOTPsubmit={handleOTPsubmit} 
            />
        </>
    )
}
