import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleEmployeeDashboard } from "../../../redux/Thunks/EmployeeDashboardThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
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

const DayCard = ({ daySchedule, scheduleID, onCompleteTask, allDays }) => {
    const [open, setOpen] = useState(false)
    const completedCount = daySchedule.tasks.filter(t => t.completed).length
    const totalCount = daySchedule.tasks.length
    const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    return (
        <div className="rounded-2xl overflow-hidden border transition-all duration-200
            border-gray-100 dark:border-[rgba(255,255,255,0.06)]
            bg-white dark:bg-[rgba(255,255,255,0.02)]">

            {/* Header del día */}
            <button
                onClick={() => setOpen(p => !p)}
                className="w-full flex items-center justify-between px-4 py-3
                    hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.03)]
                    transition-colors duration-150"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                        bg-indigo-50 dark:bg-[rgba(99,102,241,0.1)]">
                        <CalendarDays className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {daySchedule.day}
                        </p>
                        <p className="text-[11px] text-gray-400 dark:text-gray-500">
                            {completedCount}/{totalCount} tareas completadas
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Barra de progreso */}
                    <div className="hidden sm:flex items-center gap-2">
                        <div className="w-20 h-1.5 rounded-full bg-gray-100 dark:bg-[rgba(255,255,255,0.06)] overflow-hidden">
                            <div
                                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 w-8">
                            {Math.round(progress)}%
                        </span>
                    </div>
                    {open
                        ? <ChevronUp className="w-4 h-4 text-gray-400" />
                        : <ChevronDown className="w-4 h-4 text-gray-400" />
                    }
                </div>
            </button>

            {/* Tareas */}
            {open && (
                <div className="px-4 pb-4 flex flex-col gap-2 border-t
                    border-gray-50 dark:border-[rgba(255,255,255,0.04)]">
                    {daySchedule.tasks.length === 0 ? (
                        <div className="flex items-center justify-center py-6">
                            <p className="text-sm text-gray-400 dark:text-gray-600">
                                Sin tareas para este día
                            </p>
                        </div>
                    ) : (
                        daySchedule.tasks.map(task => (
                            <button
                                key={task._id}
                                onClick={() => onCompleteTask(scheduleID, daySchedule._id, task._id)}
                                className="flex items-start gap-3 p-3 rounded-xl text-left w-full
                                    transition-all duration-150 mt-2
                                    hover:bg-gray-50 dark:hover:bg-[rgba(255,255,255,0.03)]
                                    border border-transparent
                                    hover:border-gray-100 dark:hover:border-[rgba(255,255,255,0.05)]"
                            >
                                {task.completed
                                    ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-emerald-500" />
                                    : <Circle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                                }
                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-medium ${
                                        task.completed
                                            ? "line-through text-gray-400 dark:text-gray-600"
                                            : "text-gray-800 dark:text-[rgba(255,255,255,0.8)]"
                                    }`}>
                                        {task.title}
                                    </p>
                                    {task.description && (
                                        <p className="text-xs mt-0.5 text-gray-400 dark:text-gray-600 line-clamp-2">
                                            {task.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                                        <span className="text-[11px] text-gray-400 dark:text-gray-600">
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

const ScheduleCard = ({ schedule, onCompleteTask }) => {
    const [expanded, setExpanded] = useState(true)

    const allTasks = schedule.schedule.flatMap(d => d.tasks)
    const completedTasks = allTasks.filter(t => t.completed).length
    const progress = allTasks.length > 0 ? Math.round((completedTasks / allTasks.length) * 100) : 0

    // Ordenar días según DAYS_ORDER
    const sortedDays = [...schedule.schedule].sort(
        (a, b) => DAYS_ORDER.indexOf(a.day) - DAYS_ORDER.indexOf(b.day)
    )

    return (
        <div className="rounded-2xl overflow-hidden
            bg-gray-50 border border-gray-100
            dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">

            {/* Header del horario */}
            <div className="flex items-start justify-between px-5 py-4 border-b
                border-gray-100 dark:border-[rgba(255,255,255,0.05)]">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                            Horario activo
                        </p>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {schedule.title}
                    </h3>
                    {schedule.description && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">
                            {schedule.description}
                        </p>
                    )}
                    <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1.5">
                        {formatDate(schedule.startdate)} — {formatDate(schedule.enddate)}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2 ml-4 flex-shrink-0">
                    {/* Progreso general */}
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 rounded-full bg-gray-200 dark:bg-[rgba(255,255,255,0.06)] overflow-hidden">
                            <div
                                className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                            {progress}%
                        </span>
                    </div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-600">
                        {completedTasks}/{allTasks.length} tareas
                    </p>
                    <button
                        onClick={() => setExpanded(p => !p)}
                        className="flex items-center gap-1 text-[11px] font-medium
                            text-gray-400 hover:text-indigo-500 transition-colors duration-150"
                    >
                        {expanded ? "Colapsar" : "Expandir"}
                        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
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
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export const EmployeeSchedulePage = () => {
    const dispatch = useDispatch()
    const { schedules, isLoading } = useSelector(s => s.employeedashboardreducer)

    useEffect(() => {
        dispatch(HandleEmployeeDashboard({ type: "MySchedules" }))
    }, [])

    const handleCompleteTask = (scheduleID, dayID, taskID) => {
        dispatch(HandleEmployeeDashboard({
            type: "CompleteTask",
            data: { scheduleID, dayID, taskID }
        }))
    }

    if (isLoading && (!schedules || schedules.length === 0)) return <Loading />

    return (
        <div className="flex flex-col w-full px-4 py-6 gap-6 overflow-y-auto
            bg-white dark:bg-[#0f0f1a] min-h-full">

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
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                        Revisa tus tareas asignadas y marca tu progreso
                    </p>
                </div>

                {schedules && schedules.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl self-start sm:self-auto
                        bg-indigo-50 border border-indigo-100
                        dark:bg-[rgba(99,102,241,0.1)] dark:border-[rgba(99,102,241,0.2)]">
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
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                        bg-gray-100 dark:bg-[rgba(255,255,255,0.04)]">
                        <AlertCircle className="w-7 h-7 text-gray-300 dark:text-gray-600" />
                    </div>
                    <p className="text-base font-semibold text-gray-400 dark:text-gray-500">
                        Sin horarios asignados
                    </p>
                    <p className="text-sm text-gray-300 dark:text-gray-700 text-center max-w-xs">
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
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
