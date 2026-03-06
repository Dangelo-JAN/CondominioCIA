import { useState, useEffect, useRef } from "react"
import { SignIn } from "../../components/common/sign-in.jsx"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import LoadingBar from 'react-top-loading-bar'
import { useNavigate } from 'react-router-dom'
import { CommonStateHandler } from "../../utils/commonhandler.js"

export const EmployeeLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const EmployeeState = useSelector((state) => state.employeereducer)
    const [signinform, set_signinform] = useState({
        email: "",
        password: "",
    })

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, set_signinform, event)
    }

    const handlesigninsubmit = (e) => {
        e.preventDefault();
        loadingbar.current?.continuousStart();
        dispatch(HandlePostEmployees({ apiroute: "LOGIN", data: signinform }))
    }

    // Función de redirección segura con encadenamiento opcional
    const RedirectToDashbaord = () => {
        loadingbar.current?.complete()
        navigate("/auth/employee/employee-dashboard")
    }

    // CORRECCIÓN: Este efecto ahora sí reacciona cuando hay un error en el login
    useEffect(() => {
        if (EmployeeState.error?.status) {
            loadingbar.current?.complete()
        }
    }, [EmployeeState.error]) // Dependencia añadida

    useEffect(() => {
        // Solo hacemos el CHECK si no estamos autenticados
        if (!EmployeeState.isAuthenticated) {
            dispatch(HandleGetEmployees({ apiroute: "CHECKELOGIN" }))
        }

        if (EmployeeState.isAuthenticated) {
            RedirectToDashbaord()
        }
    }, [EmployeeState.isAuthenticated, dispatch]) // Dependencias completas

    // Limpieza al desmontar el componente
    useEffect(() => {
        return () => loadingbar.current?.complete();
    }, []);

    return (
        <div className="employee-login-container">
            {/* Se agrega el color para asegurar visibilidad */}
            <LoadingBar color='#f11946' ref={loadingbar} />
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <SignIn 
                    image={"../../src/assets/Employee-Welcome.jpg"} 
                    handlesigninform={handlesigninform} 
                    handlesigninsubmit={handlesigninsubmit} 
                    targetedstate={EmployeeState} 
                    statevalue={signinform} 
                    redirectpath={"/auth/employee/forgot-password"} 
                />
            </div>
        </div>
    )
}
