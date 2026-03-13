import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"
import { EmployeeHomePage } from "../pages/Employees/Dashboard Childs/EmployeeHomePage.jsx"
import { EmployeeSchedulePage } from "../pages/Employees/Dashboard Childs/EmployeeSchedulePage.jsx"
import { EmployeeWorkPhotosPage } from "../pages/Employees/Dashboard Childs/EmployeeWorkPhotosPage.jsx"

export const EmployeeRoutes = [
    {
        path: "/",
        element: <EntryPage />
    },
    {
        path: "/auth/employee/login",
        element: <EmployeeLogin />
    },
    {
        path: "/auth/employee/employee-dashboard",
        element: (
            <ProtectedRoutes>
                <EmployeeDashboard />
            </ProtectedRoutes>
        ),
        children: [
            {
                path: "/auth/employee/employee-dashboard/home",
                element: <EmployeeHomePage />
            },
            {
                path: "/auth/employee/employee-dashboard/schedule",
                element: <EmployeeSchedulePage />
            },
            {
                path: "/auth/employee/employee-dashboard/photos",
                element: <EmployeeWorkPhotosPage />
            }
        ]
    },
    {
        path: "/auth/employee/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/auth/employee/reset-email-confirmation",
        element: <ResetEmailConfirm />
    },
    {
        path: "/auth/employee/resetpassword/:token",
        element: <ResetPassword />
    },
]
