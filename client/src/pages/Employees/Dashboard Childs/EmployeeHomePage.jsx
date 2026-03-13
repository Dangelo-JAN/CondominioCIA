import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleEmployeeDashboard } from "../../../redux/Thunks/EmployeeDashboardThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { LogIn, LogOut, Clock, CheckCircle2, Circle, CalendarDays, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const DAYS_ES = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]

const formatTime = (dateStr) => {
    if (!dateStr) return "--:--"
    return new Date(dateStr).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
}

const formatDuration = (minutes) => {
    if (!minutes) return null
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export const EmployeeHomePage = () => {
    const dispatch = useDispatch()
    const { toast } = useToast()
    const { attendance, schedules, isLoading } = useSelector(s => s.employeedashboardreducer)
    const [actionLoading, setActionLoading] = useState(false)

    const today = new Date()
    const todayStr = today.toISOString().split("T")[0]
    const todayDay = DAYS_ES[today.getDay()]

    useEffect(() => {
        dispatch(HandleEmployeeDashboard({ type: "MyAttendance" }))
        dispatch(HandleEmployeeDashboard({ type: "MySchedules" }))
    }, [])

    // Log de asistencia de hoy
    const todayLog = attendance?.attendancelog?.find(
        l => new Date(l.logdate).toISOString().split("T")[0] === todayStr
    )

    const hasCheckedIn  = !!todayLog?.checkin
    const hasCheckedOut = !!todayLog?.checkout

    // Tareas de hoy del horario activo
    const activeSchedule = schedules?.find(s => s.isactive)
    const todayTasks = activeSchedule?.schedule?.find(d => d.day === todayDay)?.tasks || []

    const handleCheckIn = async () => {
        setActionLoading(true)
        const res = await dispatch(HandleEmployeeDashboard({ type: "CheckIn" }))
        setActionLoading(false)
        if (res.payload?.success) {
            toast({ variant: "success", title: "Entrada registrada", description: `${formatTime(res.payload?.data?.attendancelog?.at(-1)?.checkin)}` })
        } else {
            toast({ variant: "destructive", title: "Error", description: res.payload?.message })
        }
    }

    const handleCheckOut = async () => {
        setActionLoading(true)
        const res = await dispatch(HandleEmployeeDashboard({ type: "CheckOut" }))
        setActionLoading(false)
        if (res.payload?.success) {
            toast({ variant: "success", title: "Salida registrada", description: `Jornada: ${formatDuration(res.payload?.data?.attendancelog?.at(-1)?.duration)}` })
        } else {
            toast({ variant: "destructive", title: "Error", description: res.payload?.message })
        }
    }

    const handleCompleteTask = async (scheduleID, dayID, taskID) => {
        await dispatch(HandleEmployeeDashboard({
            type: "CompleteTask",
            data: { scheduleID, dayID, taskID }
        }))
    }

    if (isLoading && !attendance) return <Loading />

    return (
        <div className="flex flex-col w-full px-4 py-6 gap-6 overflow-y-auto
            bg-white dark:bg-[#0f0f1a] min-h-full">

            {/* Header */}
            <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 mb-1">
                    Mi Panel
                </p>
                <h1 className="text-2xl xl:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Bienvenido 👋
                </h1>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                    {today.toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                </p>
            </div>

            {/* Grid principal */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* ── Card checkin/checkout ──────────────────────────────── */}
                <div className="rounded-2xl p-5 flex flex-col gap-4
                    bg-gray-50 border border-gray-100
                    dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                                Jornada de hoy
                            </p>
                            <h2 className="text-base font-bold mt-0.5 text-gray-900 dark:text-white">
                                Control de asistencia
                            </h2>
                        </div>
                        <div className={`w-2.5 h-2.5 rounded-full ${hasCheckedIn && !hasCheckedOut ? "bg-emerald-400 animate-pulse" : "bg-gray-200 dark:bg-gray-700"}`} />
                    </div>

                    {/* Horas */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Entrada */}
                        <div className="rounded-xl p-4 flex flex-col gap-1
                            bg-white border border-gray-100
                            dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.06)]">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                Entrada
                            </p>
                            <p className={`text-2xl font-bold tracking-tight ${hasCheckedIn ? "text-emerald-500" : "text-gray-300 dark:text-gray-700"}`}>
                                {hasCheckedIn ? formatTime(todayLog.checkin) : "--:--"}
                            </p>
                        </div>
                        {/* Salida */}
                        <div className="rounded-xl p-4 flex flex-col gap-1
                            bg-white border border-gray-100
                            dark:bg-[rgba(255,255,255,0.03)] dark:border-[rgba(255,255,255,0.06)]">
                            <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                Salida
                            </p>
                            <p className={`text-2xl font-bold tracking-tight ${hasCheckedOut ? "text-red-400" : "text-gray-300 dark:text-gray-700"}`}>
                                {hasCheckedOut ? formatTime(todayLog.checkout) : "--:--"}
                            </p>
                        </div>
                    </div>

                    {/* Duración */}
                    {hasCheckedOut && todayLog?.duration && (
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl
                            bg-indigo-50 border border-indigo-100
                            dark:bg-[rgba(99,102,241,0.08)] dark:border-[rgba(99,102,241,0.15)]">
                            <Clock className="w-4 h-4 text-indigo-500" />
                            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                                Jornada: {formatDuration(todayLog.duration)}
                            </span>
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex gap-3 mt-auto">
                        <button
                            onClick={handleCheckIn}
                            disabled={hasCheckedIn || actionLoading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                                text-sm font-semibold transition-all duration-200
                                bg-emerald-500 text-white hover:bg-emerald-600
                                disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <LogIn className="w-4 h-4" />
                            Entrada
                        </button>
                        <button
                            onClick={handleCheckOut}
                            disabled={!hasCheckedIn || hasCheckedOut || actionLoading}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                                text-sm font-semibold transition-all duration-200
                                bg-red-400 text-white hover:bg-red-500
                                disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <LogOut className="w-4 h-4" />
                            Salida
                        </button>
                    </div>
                </div>

                {/* ── Tareas de hoy ─────────────────────────────────────── */}
                <div className="rounded-2xl p-5 flex flex-col gap-4
                    bg-gray-50 border border-gray-100
                    dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                                {todayDay}
                            </p>
                            <h2 className="text-base font-bold mt-0.5 text-gray-900 dark:text-white">
                                Tareas del día
                            </h2>
                        </div>
                        {todayTasks.length > 0 && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full
                                bg-indigo-50 text-indigo-600 border border-indigo-100
                                dark:bg-[rgba(99,102,241,0.12)] dark:text-indigo-400 dark:border-[rgba(99,102,241,0.2)]">
                                {todayTasks.filter(t => t.completed).length}/{todayTasks.length}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px]">
                        {todayTasks.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-2">
                                <CalendarDays className="w-8 h-8 text-gray-200 dark:text-gray-700" />
                                <p className="text-sm text-gray-400 dark:text-gray-600">
                                    Sin tareas asignadas para hoy
                                </p>
                            </div>
                        ) : (
                            todayTasks.map(task => (
                                <button
                                    key={task._id}
                                    onClick={() => handleCompleteTask(
                                        activeSchedule._id,
                                        activeSchedule.schedule.find(d => d.day === todayDay)._id,
                                        task._id
                                    )}
                                    className="flex items-start gap-3 p-3 rounded-xl text-left transition-all duration-150 w-full
                                        hover:bg-white dark:hover:bg-[rgba(255,255,255,0.04)]
                                        border border-transparent hover:border-gray-100 dark:hover:border-[rgba(255,255,255,0.06)]"
                                >
                                    {task.completed
                                        ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                                        : <Circle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                                    }
                                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                                        <p className={`text-sm font-medium truncate ${
                                            task.completed
                                                ? "line-through text-gray-400 dark:text-gray-600"
                                                : "text-gray-800 dark:text-[rgba(255,255,255,0.8)]"
                                        }`}>
                                            {task.title}
                                        </p>
                                        <p className="text-[11px] text-gray-400 dark:text-gray-600">
                                            {task.starttime} — {task.endtime}
                                        </p>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* ── Sin horario activo ─────────────────────────────────────── */}
            {!activeSchedule && !isLoading && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl
                    bg-amber-50 border border-amber-100
                    dark:bg-[rgba(245,158,11,0.08)] dark:border-[rgba(245,158,11,0.15)]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-500" />
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                        No tienes un horario activo asignado. Contacta a tu supervisor.
                    </p>
                </div>
            )}
        </div>
    )
}
