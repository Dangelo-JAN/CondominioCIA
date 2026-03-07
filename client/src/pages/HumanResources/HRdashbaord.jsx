import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { HRdashboardSidebar } from "../../components/ui/HRsidebar.jsx"
import { Outlet, useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"

export const HRDashbaord = () => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        // Si la ruta es EXACTAMENTE el dashboard, redirigimos a la sub-ruta por defecto
        if (location.pathname === "/auth/HR/dashboard" || location.pathname === "/auth/HR/dashboard/") {
            navigate("/auth/HR/dashboard/dashboard-data", { replace: true });
        }
    }, [location.pathname, navigate]);


    return (
        <div className="flex min-h-screen bg-[#f8fafc]"> {/* Fondo Slate 50 estilo Clockify */}
            <SidebarProvider>
                <div className="HRDashboard-sidebar border-r border-gray-200 bg-white">
                    <HRdashboardSidebar />
                </div>
                
                <main className="flex-1 flex flex-col w-full overflow-hidden">
                    {/* Header Superior Estilo Clockify */}
                    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-gray-500 hover:bg-gray-100" />
                            <h2 className="font-semibold text-gray-700 text-lg">Panel de Control</h2>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">
                                AD
                            </div>
                        </div>
                    </header>

                    {/* Contenedor de contenido con scroll */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-8">
                        <div className="max-w-7xl mx-auto w-full">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}
