import { HandleGetHumanResources } from "../redux/Thunks/HRThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/common/loading.jsx"

export const HRProtectedRoutes = ({ children }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HRState = useSelector((state) => state.HRReducer)
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            setIsChecking(true)
            await dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            await dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))
            setIsChecking(false)
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (isChecking || HRState.isLoading) return

        if (HRState.isAuthenticated && HRState.isAuthourized && !HRState.isVerified) {
            navigate("/auth/HR/reset-email-validation")
            return
        }

        if (!HRState.isAuthenticated && HRState.error.content) {
            navigate("/auth/HR/signup")
        }
    }, [isChecking, HRState.isLoading, HRState.isAuthenticated, HRState.isAuthourized, HRState.isVerified, HRState.error.content])

    if (isChecking || HRState.isLoading) return <Loading />

    return (HRState.isAuthenticated && HRState.isAuthourized && HRState.isVerified)
        ? children
        : null
}
