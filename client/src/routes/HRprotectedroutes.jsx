import { HandleGetHumanResources } from "../redux/Thunks/HRThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/common/loading.jsx"

export const HRProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)

    // Solo al montar — sin condición compuesta que bloquee los dispatches
    useEffect(() => {
        const checkAuth = async () => {
            // Secuencial: primero login, luego verificación
            await dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            await dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
        }
        checkAuth()
    }, [])

    // Navegación reactiva — separada y limpia
    useEffect(() => {
        if (HRState.isLoading) return

        if (HRState.isAuthenticated && HRState.isAuthourized && !HRState.isVerified) {
            navigate("/auth/HR/reset-email-validation")
            return
        }

        if (!HRState.isAuthenticated && HRState.error.content) {
            navigate("/auth/HR/signup")
        }
    }, [HRState.isLoading, HRState.isAuthenticated, HRState.isAuthourized, HRState.isVerified, HRState.error.content])

    if (HRState.isLoading) return <Loading />

    return (HRState.isAuthenticated && HRState.isAuthourized && HRState.isVerified)
        ? children
        : null
}
