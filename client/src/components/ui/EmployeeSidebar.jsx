import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { HandlePostEmployees } from "../../redux/Thunks/EmployeeThunk.js"
import { logoutEmployee } from "../../redux/Slices/EmployeeSlice.js"
import { DashboardSidebar } from "./DashboardSidebar.jsx"

const EMPLOYEE_NAV_ITEMS = [
    { label: "Dashboard",    path: "/auth/employee/employee-dashboard", icon: "/../../src/assets/HR-Dashboard/dashboard.png" },
    { label: "Mi Perfil",    path: null,                                icon: "/../../src/assets/HR-Dashboard/employee-2.png" },
    { label: "Nóminas",      path: null,                                icon: "/../../src/assets/HR-Dashboard/salary.png" },
    { label: "Ausencias",    path: null,                                icon: "/../../src/assets/HR-Dashboard/leave.png" },
    { label: "Asistencia",   path: null,                                icon: "/../../src/assets/HR-Dashboard/attendance.png" },
    { label: "Solicitudes",  path: null,                                icon: "/../../src/assets/HR-Dashboard/request.png" },
    { label: "Avisos",       path: null,                                icon: "/../../src/assets/HR-Dashboard/notice.png" },
    { label: "Entrevistas",  path: null,                                icon: "/../../src/assets/HR-Dashboard/interview-insights.png" },
]

export function EmployeeDashboardSidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(HandlePostEmployees({ apiroute: "LOGOUT" }))
            .finally(() => {
                dispatch(logoutEmployee())
                navigate("/")
            })
    }

    return (
        <DashboardSidebar
            navItems={EMPLOYEE_NAV_ITEMS}
            onLogout={handleLogout}
            appName="EMS"
            appSubtitle="Employee Panel"
        />
    )
}
