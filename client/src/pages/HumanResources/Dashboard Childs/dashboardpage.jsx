import { KeyDetailBoxContentWrapper } from "../../../components/common/Dashboard/contentwrappers.jsx"
import { SalaryChart } from "../../../components/common/Dashboard/salarychart.jsx"
import { DataTable } from "../../../components/common/Dashboard/datatable.jsx"
import { useEffect } from "react"
import { HandleGetDashboard } from "../../../redux/Thunks/DashboardThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../../../components/common/loading.jsx"
import { Users, Building2, CalendarOff, ClipboardList } from "lucide-react"

export const HRDashboardPage = () => {
    const DashboardState = useSelector((state) => state.dashboardreducer)
    const dispatch = useDispatch()

    const DataArray = [
        {
            image: "/../../src/assets/HR-Dashboard/employee-2.png",
            dataname: "employees",
            path: "/HR/dashboard/employees"
        },
        {
            image: "/../../src/assets/HR-Dashboard/department.png",
            dataname: "departments",
            path: "/HR/dashboard/departments",
        },
        {
            image: "/../../src/assets/HR-Dashboard/leave.png",
            dataname: "leaves",
            path: "/HR/dashboard/leaves"
        },
        {
            image: "/../../src/assets/HR-Dashboard/request.png",
            dataname: "requestes",
            path: "/HR/dashboard/requestes"
        }
    ]

    useEffect(() => {
        dispatch(HandleGetDashboard({ apiroute: "GETDATA" }))
    }, [])

    if (DashboardState.isLoading) {
        return <Loading />
    }

    const now = new Date()
    const timeGreeting = now.getHours() < 12
        ? "Buenos días" : now.getHours() < 18
        ? "Buenas tardes" : "Buenas noches"

    return (
        <div className="flex flex-col h-full w-full px-4 py-6 gap-6 overflow-y-auto"
            style={{ background: "linear-gradient(160deg, #0f0f1a 0%, #13131f 100%)", minHeight: "100vh" }}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400 mb-1">
                        Panel de Control
                    </p>
                    <h1 className="text-2xl xl:text-3xl font-bold text-white tracking-tight">
                        {timeGreeting} 👋
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {now.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                </div>

                {/* Live indicator */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl self-start sm:self-auto"
                    style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-xs font-medium text-indigo-300">En vivo</span>
                </div>
            </div>

            {/* KPI Cards */}
            <KeyDetailBoxContentWrapper imagedataarray={DataArray} data={DashboardState.data} />

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "rgba(99,102,241,0.15)" }} />
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">Analíticas</span>
                <div className="h-px flex-1" style={{ background: "rgba(99,102,241,0.15)" }} />
            </div>

            {/* Charts & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                {/* Chart wrapper */}
                <div className="rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)"
                    }}
                >
                    <SalaryChart balancedata={DashboardState.data} />
                </div>

                {/* Table wrapper */}
                <div className="rounded-2xl overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)"
                    }}
                >
                    <DataTable noticedata={DashboardState.data} />
                </div>
            </div>
        </div>
    )
}
