import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { useEffect } from "react"
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"

export const HRDashboardPage = () => {
    const DashboardState = useSelector((state) => state.dashboardreducer)
    const dispatch = useDispatch()

    const DataArray = [
        {
            image: "/../../src/assets/HR-Dashboard/employee-2.png",
            dataname: "Employees",
            path: "/HR/dashboard/employees"
        },
        {
            image: "/../../src/assets/HR-Dashboard/department.png",
            dataname: "Departments",
            path: "/HR/dashboard/departments",
        },
        {
            image: "/../../src/assets/HR-Dashboard/leave.png",
            dataname: "Leaves",
            path: "/HR/dashboard/leaves"
        },
        {
            image: "/../../src/assets/HR-Dashboard/request.png",
            dataname: "Requests",
            path: "/HR/dashboard/requestes"
        }
    ]

    useEffect(() => {
        dispatch(HandleGetDashboard({ apiroute: "GETDATA" }))
    }, [dispatch])

    if (DashboardState.isLoading) { 
        return <Loading />
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Título de Sección */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bienvenido de nuevo</h1>
                <p className="text-gray-500 text-sm">Aquí tienes un resumen de la actividad de hoy.</p>
            </div>

            {/* Sección de Tarjetas Métricas */}
            <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-2">
                <KeyDetailBoxContentWrapper 
                    imagedataarray={DataArray} 
                    data={DashboardState.data} 
                />
            </section>

            {/* Sección de Gráficos y Tablas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-10">
                {/* Gráfico de Salarios - Toma 7 columnas */}
                <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-800">Estructura Salarial</h3>
                        <p className="text-xs text-gray-400 font-medium italic">Distribución mensualizada</p>
                    </div>
                    <div className="h-[350px]">
                        <SalaryChart balancedata={DashboardState.data} />
                    </div>
                </div>

                {/* Tabla de Avisos - Toma 5 columnas */}
                <div className="lg:col-span-5 bg-white rounded-xl border border-gray-200 shadow-sm p-6 overflow-hidden">
                    <div className="mb-4">
                        <h3 className="font-bold text-gray-800">Notificaciones Recientes</h3>
                        <p className="text-xs text-gray-400 font-medium italic">Últimas acciones del sistema</p>
                    </div>
                    <div className="h-[350px] overflow-y-auto">
                        <DataTable noticedata={DashboardState.data} />
                    </div>
                </div>
            </div>
        </div>
    )
}
