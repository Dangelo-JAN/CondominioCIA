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
        <div className="flex flex-col h-full w-full px-4 py-6 gap-6 overflow-y-auto
            bg-white dark:bg-[#0f0f1a]">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1
                        text-indigo-500 dark:text-indigo-400">
                        Panel de Control
                    </p>
                    <h1 className="text-2xl xl:text-3xl font-bold tracking-tight
                        text-gray-900 dark:text-white">
                        {timeGreeting} 👋
                    </h1>
                    <p className="text-sm mt-1 text-gray-400 dark:text-gray-500">
                        {now.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                    </p>
                </div>

                {/* Live indicator */}
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl self-start sm:self-auto
                    bg-indigo-50 border border-indigo-100
                    dark:bg-[rgba(99,102,241,0.1)] dark:border-[rgba(99,102,241,0.2)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                            bg-indigo-400"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-300">
                        En vivo
                    </span>
                </div>
            </div>

            {/* KPI Cards */}
            <KeyDetailBoxContentWrapper imagedataarray={DataArray} data={DashboardState.data} />

            {/* Divider */}
            <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-100 dark:bg-[rgba(99,102,241,0.15)]" />
                <span className="text-xs font-semibold uppercase tracking-widest
                    text-gray-400 dark:text-gray-600">
                    Analíticas
                </span>
                <div className="h-px flex-1 bg-gray-100 dark:bg-[rgba(99,102,241,0.15)]" />
            </div>

            {/* Charts & Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
                {/* Chart wrapper */}
                <div className="rounded-2xl overflow-hidden
                    bg-gray-50 border border-gray-100
                    dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">
                    <SalaryChart balancedata={DashboardState.data} />
                </div>

                {/* Table wrapper */}
                <div className="rounded-2xl overflow-hidden
                    bg-gray-50 border border-gray-100
                    dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">
                    <DataTable noticedata={DashboardState.data} />
                </div>
            </div>
        </div>
    )
}
