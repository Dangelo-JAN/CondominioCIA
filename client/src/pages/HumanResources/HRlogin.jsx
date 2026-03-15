import { SignIn } from "../../components/common/sign-in.jsx"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'
import { CommonStateHandler } from "../../utils/commonhandler.js"
import { HandleGetHumanResources, HandlePostHumanResources } from "../../redux/Thunks/HRThunk.js"

export const HRLogin = () => {
    const HRState = useSelector((state) => state.HRReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loadingbar = useRef(null)
    const [isVerifying, setIsVerifying] = useState(false)
    const [signinform, setsigninform] = useState({
        email: "",
        password: ""
    })

    const handlesigninform = (event) => {
        CommonStateHandler(signinform, setsigninform, event)
    }

    const handlesigninsubmit = async (e) => {
        e.preventDefault()
        loadingbar.current?.continuousStart()

        const loginRes = await dispatch(HandlePostHumanResources({ apiroute: "LOGIN", data: signinform }))

        if (loginRes.payload?.success) {
            // Login exitoso — verificar email antes de redirigir
            setIsVerifying(true)
            const verifyRes = await dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
            setIsVerifying(false)

            loadingbar.current?.complete()

            if (verifyRes.payload?.alreadyverified) {
                navigate("/HR/dashboard/dashboard-data")
            } else {
                navigate("/auth/HR/verify-email")
            }
        } else {
            loadingbar.current?.complete()
        }
    }

    useEffect(() => {
        if (HRState.error?.status) {
            loadingbar.current?.complete()
        }
    }, [HRState.error])

    // Si ya tiene token al cargar la página, redirigir directo
    useEffect(() => {
        const token = localStorage.getItem("HRtoken")
        if (!token) return

        const checkAndRedirect = async () => {
            const loginRes  = await dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            if (!loginRes.payload?.success) return

            const verifyRes = await dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
            if (verifyRes.payload?.alreadyverified) {
                navigate("/HR/dashboard/dashboard-data")
            } else {
                navigate("/auth/HR/verify-email")
            }
        }
        checkAndRedirect()
    }, [])

    // Limpieza al desmontar el componente
    useEffect(() => {
        return () => loadingbar.current?.complete()
    }, [])

    return (
        <div>
            <div className="employee-login-content flex justify-center items-center h-[100vh]">
                <LoadingBar ref={loadingbar} />
                <SignIn
                    image={"../../src/assets/Employee-Welcome.jpg"}
                    handlesigninform={handlesigninform}
                    handlesigninsubmit={handlesigninsubmit}
                    targetedstate={HRState}
                    statevalue={signinform}
                    redirectpath={"/auth/HR/forgot-password"}
                />
            </div>
        </div>
    )
}
