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

const navItems = [
    { label: "Dashboard",          path: "/HR/dashboard/dashboard-data",  icon: "/../../src/assets/HR-Dashboard/dashboard.png" },
    { label: "Empleados",          path: "/HR/dashboard/employees",        icon: "/../../src/assets/HR-Dashboard/employee-2.png" },
    { label: "Departamentos",      path: "/HR/dashboard/departments",      icon: "/../../src/assets/HR-Dashboard/department.png" },
    { label: "Nóminas",            path: null,                             icon: "/../../src/assets/HR-Dashboard/salary.png" },
    { label: "Avisos",             path: null,                             icon: "/../../src/assets/HR-Dashboard/notice.png" },
    { label: "Ausencias",          path: null,                             icon: "/../../src/assets/HR-Dashboard/leave.png" },
    { label: "Asistencia",         path: null,                             icon: "/../../src/assets/HR-Dashboard/attendance.png" },
    { label: "Reclutamiento",      path: null,                             icon: "/../../src/assets/HR-Dashboard/recruitment.png" },
    { label: "Entrevistas",        path: null,                             icon: "/../../src/assets/HR-Dashboard/interview-insights.png" },
    { label: "Solicitudes",        path: null,                             icon: "/../../src/assets/HR-Dashboard/request.png" },
    { label: "Perfiles HR",        path: null,                             icon: "/../../src/assets/HR-Dashboard/HR-profiles.png" },
]

export function HRdashboardSidebar() {
    return (
        <Sidebar>
            <div className="flex h-full flex-col"
                style={{
                    background: "linear-gradient(180deg, #0d0d18 0%, #0f0f1e 100%)",
                    borderRight: "1px solid rgba(99,102,241,0.12)"
                }}
            >
                {/* Logo */}
                <div className="flex items-center gap-3 px-5 py-5 border-b"
                    style={{ borderColor: "rgba(99,102,241,0.12)" }}
                >
                    <div className="flex items-center justify-center w-9 h-9 rounded-xl"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <p className="text-white font-bold text-base tracking-tight leading-none">
                            EMS<span style={{ color: "#6366f1" }}>.</span>
                        </p>
                        <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                            HR Panel
                        </p>
                    </div>
                </div>

                {/* Nav label */}
                <div className="px-5 pt-5 pb-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                    >
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
                                                    `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                                                        isActive
                                                            ? "active-nav-item"
                                                            : "hover-nav-item"
                                                    }`
                                                }
                                                style={({ isActive }) => ({
                                                    background: isActive
                                                        ? "linear-gradient(135deg, rgba(99,102,241,0.25), rgba(139,92,246,0.15))"
                                                        : "transparent",
                                                    border: isActive
                                                        ? "1px solid rgba(99,102,241,0.35)"
                                                        : "1px solid transparent",
                                                    boxShadow: isActive
                                                        ? "0 4px 16px rgba(99,102,241,0.15)"
                                                        : "none"
                                                })}
                                            >
                                                {({ isActive }) => (
                                                    <>
                                                        <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                                                            style={{
                                                                background: isActive
                                                                    ? "rgba(99,102,241,0.3)"
                                                                    : "rgba(255,255,255,0.05)"
                                                            }}
                                                        >
                                                            <img
                                                                src={item.icon}
                                                                alt={item.label}
                                                                className="w-4 h-4 object-contain"
                                                                style={{
                                                                    filter: isActive
                                                                        ? "brightness(0) saturate(100%) invert(1)"
                                                                        : "brightness(0) saturate(100%) invert(0.5)"
                                                                }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium transition-colors duration-200"
                                                            style={{
                                                                color: isActive
                                                                    ? "#fff"
                                                                    : "rgba(255,255,255,0.45)"
                                                            }}
                                                        >
                                                            {item.label}
                                                        </span>
                                                        {isActive && (
                                                            <div className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                                                                style={{ background: "#6366f1" }}
                                                            />
                                                        )}
                                                    </>
                                                )}
                                            </NavLink>
                                        ) : (
                                            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-not-allowed opacity-40"
                                                title="Próximamente"
                                            >
                                                <div className="flex items-center justify-center w-7 h-7 rounded-lg flex-shrink-0"
                                                    style={{ background: "rgba(255,255,255,0.05)" }}
                                                >
                                                    <img
                                                        src={item.icon}
                                                        alt={item.label}
                                                        className="w-4 h-4 object-contain"
                                                        style={{ filter: "brightness(0) saturate(100%) invert(0.4)" }}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium"
                                                    style={{ color: "rgba(255,255,255,0.35)" }}
                                                >
                                                    {item.label}
                                                </span>
                                                <span className="ml-auto text-[9px] font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0"
                                                    style={{
                                                        background: "rgba(99,102,241,0.1)",
                                                        color: "rgba(99,102,241,0.6)",
                                                        border: "1px solid rgba(99,102,241,0.15)"
                                                    }}
                                                >
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
                <div className="px-3 py-4 border-t"
                    style={{ borderColor: "rgba(99,102,241,0.12)" }}
                >
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200"
                        style={{ border: "1px solid transparent" }}
                        onMouseEnter={e => {
                            e.currentTarget.style.background = "rgba(239,68,68,0.08)"
                            e.currentTarget.style.borderColor = "rgba(239,68,68,0.2)"
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.background = "transparent"
                            e.currentTarget.style.borderColor = "transparent"
                        }}
                    >
                        <div className="flex items-center justify-center w-7 h-7 rounded-lg"
                            style={{ background: "rgba(239,68,68,0.1)" }}
                        >
                            <LogOut className="w-4 h-4" style={{ color: "rgba(239,68,68,0.7)" }} />
                        </div>
                        <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
                            Cerrar sesión
                        </span>
                    </div>
                </div>
            </div>
        </Sidebar>
    )
}
