import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Zap, LogOut, Sun, Moon } from "lucide-react"
import { HandleHRLogout } from "../../redux/Thunks/HRThunk.js"
import { useTheme } from "../../hooks/useTheme.js"

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
    const { isDark, toggleTheme } = useTheme()

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
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
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
                        text-gray-300 dark:text-[rgba(255,255,255,0.25)]">
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
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200"
                                                style={({ isActive }) => isActive ? {
                                                    background: "linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.08))",
                                                    border: "1px solid rgba(99,102,241,0.25)",
                                                    boxShadow: "0 2px 12px rgba(99,102,241,0.1)"
                                                } : {
                                                    border: "1px solid transparent"
                                                }}
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <div
                                                            className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0 transition-colors duration-200"
                                                            style={{
                                                                background: isActive
                                                                    ? "rgba(99,102,241,0.2)"
                                                                    : "rgba(0,0,0,0.05)"
                                                            }}
                                                        >
                                                            <img
                                                                src={item.icon}
                                                                alt={item.label}
                                                                className="w-4 h-4 object-contain"
                                                                style={{
                                                                    filter: isActive
                                                                        ? "brightness(0) saturate(100%) invert(45%) sepia(80%) saturate(600%) hue-rotate(220deg)"
                                                                        : "brightness(0) saturate(100%) invert(60%)"
                                                                }}
                                                            />
                                                        </div>
                                                        <span
                                                            className="text-sm font-medium"
                                                            style={{ color: isActive ? "#6366f1" : undefined }}
                                                        >
                                                            {!isActive && (
                                                                <span className="text-gray-500 dark:text-[rgba(255,255,255,0.45)]">
                                                                    {item.label}
                                                                </span>
                                                            )}
                                                            {isActive && item.label}
                                                        </span>
                                                        {isActive && (
                                                            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0 bg-indigo-500" />
                                                        )}
                                                    </>
                                                )}
                                            </NavLink>
                                        ) : (
                                            <div
                                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-not-allowed opacity-40"
                                                style={{ border: "1px solid transparent" }}
                                            >
                                                <div
                                                    className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                                                    style={{ background: "rgba(0,0,0,0.05)" }}
                                                >
                                                    <img
                                                        src={item.icon}
                                                        alt={item.label}
                                                        className="w-4 h-4 object-contain"
                                                        style={{ filter: "brightness(0) saturate(100%) invert(60%)" }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-400 dark:text-[rgba(255,255,255,0.35)]">
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

                {/* Footer */}
                <div className="px-3 py-4 border-t border-gray-100 dark:border-[rgba(99,102,241,0.12)] flex flex-col gap-1">

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                            border border-transparent
                            hover:bg-gray-50 hover:border-gray-100
                            dark:hover:bg-[rgba(255,255,255,0.05)] dark:hover:border-[rgba(255,255,255,0.08)]"
                    >
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0
                            bg-amber-50 dark:bg-[rgba(99,102,241,0.1)]
                            transition-colors duration-300">
                            {isDark
                                ? <Sun className="w-4 h-4 text-amber-400" />
                                : <Moon className="w-4 h-4 text-indigo-400" />
                            }
                        </div>
                        <span className="text-sm font-medium text-gray-400 dark:text-[rgba(255,255,255,0.35)]">
                            {isDark ? "Modo claro" : "Modo oscuro"}
                        </span>

                        {/* Toggle pill */}
                        <div className="ml-auto flex-shrink-0 w-8 h-4 rounded-full relative transition-colors duration-300
                            bg-gray-200 dark:bg-indigo-500">
                            <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all duration-300
                                ${isDark ? "left-[18px]" : "left-[2px]"}`}
                            />
                        </div>
                    </button>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer
                            border border-transparent
                            hover:bg-red-50 hover:border-red-100
                            dark:hover:bg-[rgba(239,68,68,0.08)] dark:hover:border-[rgba(239,68,68,0.2)]"
                    >
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0
                            bg-red-50 dark:bg-[rgba(239,68,68,0.1)]">
                            <LogOut className="w-4 h-4 text-red-400" />
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
