import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { ForgotPassowrd } from "../../components/common/forgot-password.jsx"
import { HandlePostEmployees } from "../../redux/Thunks/EmployeeThunk.js"

export const ForgotPassword = () => {
    // Nota: Asegúrate de que el reducer en el store se llame exactamente 'employeereducer'
    const EmplyoeeState = useSelector((state) => state.employeereducer)
    const loadingbar = useRef(null)
    const [forgotpassowrdform, setforgotpassowrdform] = useState({ email: "" })
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlesforgotpasswordform = (e) => {
        setforgotpassowrdform({ ...forgotpassowrdform, [e.target.name]: e.target.value })
    }

    const handleforgotpasswordsubmit = (e) => {
        e.preventDefault();
        // Agregamos el encadenamiento opcional (?.) para evitar el crash
        loadingbar.current?.continuousStart();
        dispatch(HandlePostEmployees({ apiroute: "FORGOT_PASSWORD", data: forgotpassowrdform }))
    }

    // CORRECCIÓN: Movimos la lógica del error dentro de un useEffect dedicado
    useEffect(() => {
        if (!EmplyoeeState.isLoading && EmplyoeeState.error?.status) { 
            loadingbar.current?.complete()
        }
    }, [EmplyoeeState.isLoading, EmplyoeeState.error])

    // CORRECCIÓN: Agregamos ?. a la barra en la navegación exitosa
    useEffect(() => {
        if (EmplyoeeState.data) {
            loadingbar.current?.complete()
            navigate("/auth/employee/reset-email-confirmation")
        }
    }, [EmplyoeeState.data, navigate])

    // Limpieza de seguridad al montar/desmontar
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    return (
        <div className="employee-login-container">
            {/* Es vital que el componente LoadingBar esté aquí antes que el contenido */}
            <LoadingBar color='#f11946' ref={loadingbar} />
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <ForgotPassowrd 
                    handleforgotpasswordsubmit={handleforgotpasswordsubmit} 
                    handlesforgotpasswordform={handlesforgotpasswordform} 
                    targetState={EmplyoeeState} 
                    redirectpath={"/auth/employee/login"}
                />
            </div>
        </div>
    )
}
