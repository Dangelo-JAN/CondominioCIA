import { useState, useEffect, useRef } from "react"
import { SignIn } from "../../components/common/sign-in.jsx"
import { useDispatch, useSelector } from "react-redux"
import { HandlePostEmployees, HandleGetEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import { clearEmployeeAuthState } from "../../redux/Slices/EmployeeSlice.js"
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
    const [redirectToVerify, setRedirectToVerify] = useState(false)
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, set_signinform, event)
    }

    const handlesigninsubmit = async (e) => {
        e.preventDefault();
        setRedirectToVerify(false)
        loadingbar.current?.continuousStart();
        dispatch(HandlePostEmployees({ apiroute: "LOGIN", data: signinform }))
    }


    const RedirectToDashbaord = () => {
        loadingbar.current?.complete()
        navigate("/auth/employee/employee-dashboard")
    }

    if (EmployeeState.error.status) {
        loadingbar.current?.complete()
    }

    // Cleanup: limpiar estado de autenticación al montar el componente de login
    useEffect(() => {
        dispatch(clearEmployeeAuthState())
    }, [dispatch])

    useEffect(() => {
        // Solo verificar autenticación una vez al montar el componente
        if (!hasCheckedAuth && !EmployeeState.isAuthenticated) {
            setHasCheckedAuth(true)
            dispatch(HandleGetEmployees({ apiroute: "CHECKELOGIN" }))
        }

        if (EmployeeState.isAuthenticated) {
            RedirectToDashbaord()
        }

        // Verificar si el error indica que el correo no está verificado
        if (EmployeeState.error.status && 
            EmployeeState.error.message?.includes("verificar")) {
            setRedirectToVerify(true)
            setTimeout(() => {
                navigate("/auth/employee/verify-email")
            }, 2000)
        }
    }, [EmployeeState.isAuthenticated, EmployeeState.error, hasCheckedAuth])

    return (
        <div className="employee-login-container">
            <LoadingBar ref={loadingbar} />
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <SignIn image={"../../src/assets/Employee-Welcome.jpg"} handlesigninform={handlesigninform} handlesigninsubmit={handlesigninsubmit} targetedstate={EmployeeState} statevalue={signinform} redirectpath={"/auth/employee/forgot-password"} />
            </div>
        </div>
    )
}
