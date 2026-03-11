import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { DashboardLayout } from "../../components/common/DashboardLayout.jsx"
import { EmployeeDashboardSidebar } from "../../components/ui/EmployeeSidebar.jsx"

export const EmployeeDashboard = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (
            location.pathname === "/auth/employee/employee-dashboard" ||
            location.pathname === "/auth/employee/employee-dashboard/"
        ) {
            navigate("/auth/employee/employee-dashboard/home")
        }
    }, [])

    return (
        <DashboardLayout sidebar={<EmployeeDashboardSidebar />} />
    )
}
