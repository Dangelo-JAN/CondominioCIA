import { Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { HandleGetEmployees } from "../redux/Thunks/EmployeeThunk"
import { HandleEmployeeDashboard } from "../redux/Thunks/EmployeeDashboardThunk"
import { Loading } from "../components/common/loading.jsx"

export const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.employeereducer)
    const dispatch = useDispatch()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            setIsChecking(true)
            await dispatch(HandleGetEmployees({ apiroute: "CHECKELOGIN" }))
            // Cargar attendance del empleado al iniciar sesión
            await dispatch(HandleEmployeeDashboard({ type: "MyAttendance" }))
            await dispatch(HandleEmployeeDashboard({ type: "MySchedules" }))
            setIsChecking(false)
        }
        checkAuth()
    }, [])

    if (isChecking) return <Loading />

    return isAuthenticated ? children : <Navigate to="/" />
}
