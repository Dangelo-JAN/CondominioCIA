import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Zap, LogOut } from "lucide-react"
import { HandleHRLogout } from "../../redux/Thunks/HRThunk.js"

const navItems = [
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
        <Sidebar>
            <div className="flex h-full flex-col
                bg-white border-r border-gray-100
                dark:bg-[#0d0d18] dark:border-[rgba(99,102,241,0.12)]"
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-5 border-b
                    border-gray-100 dark:border-[rgba(99,102,241,0.12)]">
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600">
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="font-bold text-base tracking-tight leading-none
                            text-gray-900 dark:text-white">
                            EMS<span className="text-indigo-500">.</span>
                        </p>
                        <p className="text-xs mt-0.5 text-gray-400 dark:text-[rgba(255,255,255,0.3)]">
                            HR Panel
                        </p>
                    </div>
                </div>

                {/* Nav label */}
                <div className="px-5 pt-5 pb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]
                        text-gray-400 dark:text-[rgba(255,255,255,0.25)]">
                        Navegación
                    </p>
                </div>

                {/* Nav items */}
                <SidebarContent className="flex-1 overflow-y-auto px-3 pb-3">
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.label}>
                                        {item.path ? (
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 border ${
                                                        isActive
                                                            ? "border-indigo-200 bg-indigo-50 dark:bg-[rgba(99,102,241,0.2)] dark:border-[rgba(99,102,241,0.35)] shadow-sm shadow-indigo-100 dark:shadow-[0_4px_16px_rgba(99,102,241,0.15)]"
                                                            : "border-transparent hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.04)]"
                                                    }`
                                                }
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <div className={`flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 ${
                                                            isActive
                                                                ? "bg-indigo-100 dark:bg-[rgba(99,102,241,0.3)]"
                                                                : "bg-gray-100 dark:bg-[rgba(255,255,255,0.05)]"
                                                        }`}>
                                                            <img
                                                                src={item.icon}
                                                                alt={item.label}
                                                                className={`w-4 h-4 object-contain ${
                                                                    isActive
                                                                        ? "[filter:brightness(0)_saturate(100%)_invert(35%)_sepia(80%)_saturate(500%)_hue-rotate(220deg)] dark:[filter:brightness(0)_saturate(100%)_invert(1)]"
                                                                        : "[filter:brightness(0)_saturate(100%)_invert(60%)] dark:[filter:brightness(0)_saturate(100%)_invert(0.5)]"
                                                                }`}
                                                            />
                                                        </div>
                                                        <span className={`text-sm font-medium ${
                                                            isActive
                                                                ? "text-indigo-700 dark:text-white"
                                                                : "text-gray-500 dark:text-[rgba(255,255,255,0.45)]"
                                                        }`}>
                                                            {item.label}
                                                        </span>
                                                        {isActive && (
                                                            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />
                                                        )}
                                                    </>
                                                )}
                                            </NavLink>
                                        ) : (
                                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-not-allowed opacity-40">
                                                <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0
                                                    bg-gray-100 dark:bg-[rgba(255,255,255,0.05)]">
                                                    <img
                                                        src={item.icon}
                                                        alt={item.label}
                                                        className="w-4 h-4 object-contain
                                                            [filter:brightness(0)_saturate(100%)_invert(60%)]
                                                            dark:[filter:brightness(0)_saturate(100%)_invert(0.4)]"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium
                                                    text-gray-500 dark:text-[rgba(255,255,255,0.35)]">
                                                    {item.label}
                                                </span>
                                                <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0
                                                    bg-indigo-50 text-indigo-400 border border-indigo-100
                                                    dark:bg-[rgba(99,102,241,0.1)] dark:text-[rgba(99,102,241,0.6)] dark:border-[rgba(99,102,241,0.15)]">
                                                    Soon
                                                </span>
                                            </div>
                                        )}
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                {/* Footer — Logout */}
                <div className="px-3 py-4 border-t
                    border-gray-100 dark:border-[rgba(99,102,241,0.12)]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer border border-transparent
                            hover:bg-red-50 hover:border-red-100
                            dark:hover:bg-[rgba(239,68,68,0.08)] dark:hover:border-[rgba(239,68,68,0.2)]"
                    >
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0
                            bg-red-50 dark:bg-[rgba(239,68,68,0.1)]">
                            <LogOut className="w-4 h-4 text-red-400 dark:text-[rgba(239,68,68,0.7)]" />
                        </div>
                        <span className="text-sm font-medium text-gray-400 dark:text-[rgba(255,255,255,0.35)]">
                            Cerrar sesión
                        </span>
                    </button>
                </div>
            </div>
        </Sidebar>
    )
}
