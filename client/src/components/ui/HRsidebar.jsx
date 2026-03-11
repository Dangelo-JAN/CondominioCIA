import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { HandleHRLogout } from "../../redux/Thunks/HRThunk.js"
import { DashboardSidebar } from "./DashboardSidebar.jsx"

const HR_NAV_ITEMS = [
    { label: "Dashboard",     path: "/HR/dashboard/dashboard-data", icon: "/../../src/assets/HR-Dashboard/dashboard.png" },
    { label: "Empleados",     path: "/HR/dashboard/employees",       icon: "/../../src/assets/HR-Dashboard/employee-2.png" },
    { label: "Departamentos", path: "/HR/dashboard/departments",     icon: "/../../src/assets/HR-Dashboard/department.png" },
    { label: "Nóminas",       path: null,                            icon: "/../../src/assets/HR-Dashboard/salary.png" },
    { label: "Avisos",        path: null,                            icon: "/../../src/assets/HR-Dashboard/notice.png" },
    { label: "Ausencias",     path: null,                            icon: "/../../src/assets/HR-Dashboard/leave.png" },
    { label: "Asistencia",    path: null,                            icon: "/../../src/assets/HR-Dashboard/attendance.png" },
    { label: "Reclutamiento", path: null,                            icon: "/../../src/assets/HR-Dashboard/recruitment.png" },
    { label: "Entrevistas",   path: null,                            icon: "/../../src/assets/HR-Dashboard/interview-insights.png" },
    { label: "Solicitudes",   path: null,                            icon: "/../../src/assets/HR-Dashboard/request.png" },
    { label: "Perfiles HR",   path: null,                            icon: "/../../src/assets/HR-Dashboard/HR-profiles.png" },
]

export function HRdashboardSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(HandleHRLogout()).finally(() => {
            navigate("/")
        })
    }

    return (
        <DashboardSidebar
            navItems={HR_NAV_ITEMS}
            onLogout={handleLogout}
            appName="EMS"
            appSubtitle="HR Panel"
        />
    )
}
