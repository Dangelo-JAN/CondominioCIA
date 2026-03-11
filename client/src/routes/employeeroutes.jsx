import { EmployeeLogin } from "../pages/Employees/emplyoeelogin.jsx"
import { EmployeeDashboard } from "../pages/Employees/employeedashboard.jsx"
import { ProtectedRoutes } from "./protectedroutes.jsx"
import { ForgotPassword } from "../pages/Employees/forgotpassword.jsx"
import { ResetEmailConfirm } from "../pages/Employees/resetemailconfirm.jsx"
import { ResetPassword } from "../pages/Employees/resetpassword.jsx"
import { EntryPage } from "../pages/Employees/EntryPage.jsx"

// Placeholder para la home del empleado — reemplazar cuando se desarrolle
const EmployeeHomePage = () => (
    <div className="flex flex-col h-full w-full px-4 py-6 bg-white dark:bg-[#0f0f1a]">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
            Bienvenido 👋
        </p>
    </div>
)

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
