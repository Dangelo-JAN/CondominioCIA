import { useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { DashboardLayout } from "../../components/common/DashboardLayout.jsx"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"

export const HRDashbaord = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (location.pathname === "/HR/dashboard" || location.pathname === "/HR/dashboard/") {
            navigate("/HR/dashboard/dashboard-data")
        }
    }, [])

    return (
        <DashboardLayout sidebar={<HRdashboardSidebar />} />
    )
}
