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
    const [authResult, setAuthResult] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            setIsChecking(true)

            const loginRes  = await dispatch(HandleGetHumanResources({ apiroute: "CHECKLOGIN" }))
            const verifyRes = await dispatch(HandleGetHumanResources({ apiroute: "CHECK_VERIFY_EMAIL" }))

            const isAuthenticated = loginRes.payload?.success === true
            const isVerified      = verifyRes.payload?.alreadyverified === true

            setAuthResult({ isAuthenticated, isVerified })
            setIsChecking(false)
        }
        checkAuth()
    }, [])

    useEffect(() => {
        if (isChecking || authResult === null) return

        if (!authResult.isAuthenticated) {
            navigate("/auth/HR/signup")
            return
        }

        if (authResult.isAuthenticated && !authResult.isVerified) {
            navigate("/auth/HR/reset-email-validation")
        }
    }, [isChecking, authResult])

    if (isChecking) return <Loading />

    return (authResult?.isAuthenticated && authResult?.isVerified) ? children : null
}
