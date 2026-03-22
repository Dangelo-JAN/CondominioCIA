import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleEmployeeDashboard } from "../../../redux/Thunks/EmployeeDashboardThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { useIsDark } from "../../../hooks/useIsDark.js"
import {
    CalendarDays, CheckCircle2, Circle, ChevronDown,
    ChevronUp, Clock, ClipboardList, AlertCircle
} from "lucide-react"

const DAYS_ORDER = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const formatDate = (dateStr) => {
    if (!dateStr) return ""
    return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "numeric", month: "short", year: "numeric"
    })
}

// ── Tokens de contraste ───────────────────────────────────────────────────
const CARD = {
    light: { bg: "#f0f2ff", border: "#c7d2fe", shadow: "0 2px 16px rgba(99,102,241,0.08), 0 1px 4px rgba(0,0,0,0.05)" },
    dark: { bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)", shadow: "0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.06)" },
}
const SUBCARD = {
    light: { bg: "#ffffff", border: "#e0e7ff" },
    dark: { bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.1)" },
}
const DIVIDER = {
    light: "#e0e7ff",
    dark: "rgba(255,255,255,0.07)",
}

// ── DayCard ───────────────────────────────────────────────────────────────
const DayCard = ({ daySchedule, scheduleID, onCompleteTask, isDark }) => {
    const [open, setOpen] = useState(false)
    const completedCount = daySchedule.tasks.filter(t => t.completed).length
    const totalCount = daySchedule.tasks.length
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
    const sub = isDark ? SUBCARD.dark : SUBCARD.light

    return (
        <div className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{
                background: sub.bg,
                border: `1px solid ${sub.border}`,
            }}>

            <button
                onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3 transition-colors duration-150"
                style={{ background: "transparent" }}
                onMouseEnter={e => e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.04)" : "#f5f7ff"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                            background: isDark ? "rgba(99,102,241,0.15)" : "#e0e7ff",
                            border: `1px solid ${isDark ? "rgba(99,102,241,0.3)" : "#c7d2fe"}`,
                        }}>
                        <CalendarDays className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold"
                            style={{ color: isDark ? "#ffffff" : "#111827" }}>
                            {daySchedule.day}
                        </p>
                        <p className="text-[11px]"
                            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(107,114,128,1)" }}>
                            {completedCount}/{totalCount} tareas completadas
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full overflow-hidden"
                            style={{ background: isDark ? "rgba(255,255,255,0.1)" : "#e0e7ff" }}>
                            <div className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-[11px] font-medium w-8"
                            style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(107,114,128,1)" }}>
                            {Math.round(progress)}%
                        </span>
                    </div>
                    {open
                        ? <ChevronUp className="w-4 h-4" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#6b7280" }} />
                        : <ChevronDown className="w-4 h-4" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#6b7280" }} />
                    }
                </div>
            </button>

            {open && (
                <div className="px-4 pb-4 flex flex-col gap-2"
                    style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.07)" : "#e0e7ff"}` }}>
                    {daySchedule.tasks.length === 0 ? (
                        <div className="flex items-center justify-center py-6">
                            <p className="text-sm" style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(156,163,175,1)" }}>
                                Sin tareas para este día
                            </p>
                        </div>
                    ) : (
                        daySchedule.tasks.map(task => (
                            <button
                                key={task._id}
                                onClick={() => onCompleteTask(scheduleID, daySchedule._id, task._id)}
                                className="flex items-start gap-3 p-3 rounded-xl text-left w-full mt-2
                                    transition-all duration-150"
                                style={{ border: "1px solid transparent" }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.background = isDark ? "rgba(255,255,255,0.05)" : "#f5f7ff"
                                    e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "#c7d2fe"
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.background = "transparent"
                                    e.currentTarget.style.borderColor = "transparent"
                                }}
                            >
                                {task.completed
                                    ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                                    : <Circle className="w-4 h-4 mt-0.5 flex-shrink-0"
                                        style={{ color: isDark ? "rgba(255,255,255,0.2)" : "#d1d5db" }} />
                                }
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium"
                                        style={{
                                            color: task.completed
                                                ? isDark ? "rgba(255,255,255,0.3)" : "rgba(156,163,175,1)"
                                                : isDark ? "rgba(255,255,255,0.85)" : "#111827",
                                            textDecoration: task.completed ? "line-through" : "none"
                                        }}>
                                        {task.title}
                                    </p>
                                    {task.description && (
                                        <p className="text-xs mt-0.5 line-clamp-2"
                                            style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(107,114,128,1)" }}>
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3"
                                            style={{ color: isDark ? "rgba(255,255,255,0.25)" : "#d1d5db" }} />
                                        <span className="text-[11px]"
                                            style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(107,114,128,1)" }}>
                                            {task.starttime} — {task.endtime}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}

// ── ScheduleCard ──────────────────────────────────────────────────────────
const ScheduleCard = ({ schedule, onCompleteTask, isDark }) => {
    const [expanded, setExpanded] = useState(true)
    const card = isDark ? CARD.dark : CARD.light

    const allTasks = schedule.schedule.flatMap(d => d.tasks)
    const completedTasks = allTasks.filter(t => t.completed).length
    const progress = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0

    const sortedDays = [...schedule.schedule].sort(
        (a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day)
    )

    return (
        <div className="rounded-2xl overflow-hidden"
            style={{ background: card.bg, border: `1px solid ${card.border}`, boxShadow: card.shadow }}>

            {/* Header */}
            <div className="flex items-start justify-between px-5 py-4"
                style={{ borderBottom: `1px solid ${isDark ? DIVIDER.dark : DIVIDER.light}` }}>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                            Horario activo
                        </p>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <h3 className="text-base font-bold truncate"
                        style={{ color: isDark ? "#ffffff" : "#111827" }}>
                        {schedule.title}
                    </h3>
                    {schedule.description && (
                        <p className="text-xs mt-0.5 line-clamp-2"
                            style={{ color: isDark ? "rgba(255,255,255,0.45)" : "rgba(107,114,128,1)" }}>
                            {schedule.description}
                        </p>
                    )}
                    <p className="text-[11px] mt-1.5"
                        style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(107,114,128,1)" }}>
                        {formatDate(schedule.startdate)} — {formatDate(schedule.enddate)}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full overflow-hidden"
                            style={{ background: isDark ? "rgba(255,255,255,0.1)" : "#e0e7ff" }}>
                            <div className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${progress}%` }} />
                        </div>
                        <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                            {progress}%
                        </span>
                    </div>
                    <p className="text-[11px]"
                        style={{ color: isDark ? "rgba(255,255,255,0.35)" : "rgba(107,114,128,1)" }}>
                        {completedTasks}/{allTasks.length} tareas
                    </p>
                    <button
                        onClick={() => setExpanded(p => !p)}
                        className="flex items-center gap-1 text-[11px] font-medium
                            text-gray-400 hover:text-indigo-500 transition-colors duration-150">
                        {expanded ? "Colapsar" : "Expandir"}
                        {expanded
                            ? <ChevronUp className="w-3 h-3" />
                            : <ChevronDown className="w-3 h-3" />
                        }
                    </button>
                </div>
            </div>

            {/* Días */}
            {expanded && (
                <div className="p-4 flex flex-col gap-3">
                    {sortedDays.map(day => (
                        <DayCard
                            key={day._id}
                            daySchedule={day}
                            scheduleID={schedule._id}
                            onCompleteTask={onCompleteTask}
                            isDark={isDark}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Página principal ──────────────────────────────────────────────────────
export const EmployeeSchedulePage = () => {
    const dispatch = useDispatch()
    const isDark = useIsDark()
    const { schedules, isLoading } = useSelector(s => s.employeedashboardreducer)

    useEffect(() => {
        dispatch(HandleEmployeeDashboard({ type: "MySchedules" }))
    }, [])

    const handleCompleteTask = (scheduleID, dayID, taskID) => {
        dispatch(HandleEmployeeDashboard({ type: "CompleteTask", data: { scheduleID, dayID, taskID } }))
    }

    if (isLoading && (!schedules || schedules.length === 0)) return <Loading />

    return (
        <div className="flex flex-col w-full px-4 py-6 gap-6 overflow-y-auto min-h-full"
            style={{ background: isDark ? "#0f0f1a" : "#ffffff" }}>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1
                        text-indigo-500 dark:text-indigo-400">
                        Mi Horario
                    </p>
                    <h1 className="text-2xl xl:text-3xl font-bold tracking-tight
                        text-gray-900 dark:text-white">
                        Horarios y Tareas
                    </h1>
                    <p className="text-sm mt-1 text-gray-400 dark:text-gray-500">
                        Revisa tus tareas asignadas y marca tu progreso
                    </p>
                </div>

                {schedules && schedules.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl self-start sm:self-auto"
                        style={{
                            background: isDark ? "rgba(99,102,241,0.15)" : "#e0e7ff",
                            border: `1px solid ${isDark ? "rgba(99,102,241,0.3)" : "#a5b4fc"}`,
                        }}>
                        <ClipboardList className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                        <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">
                            {schedules.length} horario{schedules.length > 1 ? "s" : ""} activo{schedules.length > 1 ? "s" : ""}
                        </span>
                    </div>
                )}
            </div>

            {/* Contenido */}
            {!schedules || schedules.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ background: isDark ? "rgba(255,255,255,0.05)" : "#f0f2ff" }}>
                        <AlertCircle className="w-7 h-7"
                            style={{ color: isDark ? "rgba(255,255,255,0.2)" : "#a5b4fc" }} />
                    </div>
                    <p className="text-base font-semibold"
                        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(107,114,128,1)" }}>
                        Sin horarios asignados
                    </p>
                    <p className="text-sm text-center max-w-xs"
                        style={{ color: isDark ? "rgba(255,255,255,0.25)" : "rgba(156,163,175,1)" }}>
                        Tu supervisor aún no ha asignado un horario. Vuelve más tarde.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {schedules.map(schedule => (
                        <ScheduleCard
                            key={schedule._id}
                            schedule={schedule}
                            onCompleteTask={handleCompleteTask}
                            isDark={isDark}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
