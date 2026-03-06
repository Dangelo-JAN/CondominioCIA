import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { ForgotPassowrd } from "../../components/common/forgot-password.jsx"
import { HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRForgotPasswordPage = () => {
    // CORRECCIÓN: Unificamos el nombre a HRstate para que coincida en todo el archivo
    const HRstate = useSelector((state) => state.HRReducer)
    const loadingbar = useRef(null)
    const [forgotpassowrdform, setforgotpassowrdform] = useState({ email: "" }) 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlesforgotpasswordform = (e) => {
        setforgotpassowrdform({ ...forgotpassowrdform, [e.target.name]: e.target.value })
    }

    const handleforgotpasswordsubmit = (e) => {
        e.preventDefault();
        loadingbar.current?.continuousStart();
        dispatch(HandlePostHumanResources({ apiroute: "FORGOT_PASSWORD", data: forgotpassowrdform }))
    }

    // EFECTO 1: Detener la barra si hay error del servidor
    // Se corrigió HRState -> HRstate para evitar ReferenceError
    useEffect(() => {
        if (HRstate.error?.status) {
            loadingbar.current?.complete()
        }
    }, [HRstate.error?.status])

    useEffect(() => {
        if (HRstate.data) {
            loadingbar.current?.complete()
            navigate("/auth/HR/reset-email-confirmation")
        }
    }, [HRstate.data, navigate])

    // EFECTO 3: Limpieza al desmontar el componente
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    return (
        <div className="employee-login-container">
            <LoadingBar color='#f11946' ref={loadingbar} />
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <ForgotPassowrd 
                    handleforgotpasswordsubmit={handleforgotpasswordsubmit} 
                    handlesforgotpasswordform={handlesforgotpasswordform} 
                    targetState={HRstate} 
                    redirectpath={"/auth/HR/login"} 
                />
            </div>
        </div>
    )
}
