import { Reset_Password } from "../../components/common/reset-password.jsx"
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate, useParams } from 'react-router-dom'

export const ResetHRPasswordPage = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const { token } = useParams()
    const [passworderror, setpassworderror] = useState(false)
    const [passwordform, setpasswordform] = useState({
        password: "",
        repeatpassword: ""
    })

    const handlepasswordsubmit = (e) => {
        e.preventDefault();
        if (passwordform.password === passwordform.repeatpassword) { 
            setpassworderror(false)
            // Agregamos ?. para evitar el crash si la referencia no está lista
            loadingbar.current?.continuousStart();
            dispatch(HandlePostHumanResources({ 
                apiroute: token, 
                data: { password: passwordform.password }, 
                type: "resetpassword" 
            }))
        }
        else {
            setpassworderror(true)
        }
    }

    const handlepasswordform = (e) => {
        setpasswordform({ ...passwordform, [e.target.name]: e.target.value })
    }

    // EFECTO 1: Detener la barra si hay error del servidor
    useEffect(() => {
        if (HRState.error?.status) {
            loadingbar.current?.complete()
        }
    }, [HRState.error?.status])

    // EFECTO 2: Navegación tras éxito
    useEffect(() => {
        if (HRState.isResetPassword) {
            loadingbar.current?.complete()
            navigate("/auth/HR/login")
        }
    }, [HRState.isResetPassword, navigate])

    // EFECTO 3: Limpieza al desmontar el componente
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    console.log(HRState)

    return (
        <div className="reset-password-container">
            {/* Se agrega color para visibilidad */}
            <LoadingBar color='#f11946' ref={loadingbar} />
            <div className="reset-password-content flex justify-center items-center h-[100vh]">
                <Reset_Password 
                    handlepasswordsubmit={handlepasswordsubmit} 
                    handlepasswordform={handlepasswordform} 
                    passworderror={passworderror} 
                    targetstate={HRState} 
                />
            </div>
        </div>
    )
}
