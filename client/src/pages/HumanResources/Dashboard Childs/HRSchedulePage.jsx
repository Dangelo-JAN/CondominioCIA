import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { HandleHRSchedule } from "../../../redux/Thunks/HRScheduleThunk.js"
import { HandleGetHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { Loading } from "../../../components/common/loading.jsx"
import { useToast } from "@/hooks/use-toast"
import {
    Plus, Trash2, CalendarDays, ChevronDown, ChevronUp,
    Users, Clock, ClipboardList, X, CheckCircle2, Circle,
    AlertCircle, Pencil, ToggleLeft, ToggleRight
} from "lucide-react"

const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

const emptyTask = () => ({ title: "", description: "", starttime: "", endtime: "" })
const emptyDay  = () => ({ day: "Lunes", tasks: [emptyTask()] })

const formatDate = (d) => d ? new Date(d).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" }) : ""

// ── Pill de estado ────────────────────────────────────────────────────────
const StatusPill = ({ active }) => (
    <span className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
        active
            ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-[rgba(16,185,129,0.1)] dark:text-emerald-400 dark:border-[rgba(16,185,129,0.2)]"
            : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-[rgba(255,255,255,0.04)] dark:text-gray-500 dark:border-[rgba(255,255,255,0.06)]"
    }`}>
        <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-emerald-400" : "bg-gray-300 dark:bg-gray-600"}`} />
        {active ? "Activo" : "Inactivo"}
    </span>
)

// ── Card de horario en la lista ───────────────────────────────────────────
const ScheduleCard = ({ schedule, employees, onDelete, onToggle, onEdit }) => {
    const [open, setOpen] = useState(false)
    const assignedEmployee = employees?.find(e => e._id === schedule.employee?._id || e._id === schedule.employee)

    const allTasks  = schedule.schedule?.flatMap(d => d.tasks) || []
    const completed = allTasks.filter(t => t.completed).length

    return (
        <div className="rounded-2xl overflow-hidden border transition-all duration-200
            border-gray-100 dark:border-[rgba(255,255,255,0.06)]
            bg-white dark:bg-[rgba(255,255,255,0.02)]">

            {/* Header */}
            <div className="flex items-start justify-between px-4 py-3 gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                            {schedule.title}
                        </p>
                        <StatusPill active={schedule.isactive} />
                    </div>
                    {schedule.description && (
                        <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-1 mb-1">
                            {schedule.description}
                        </p>
                    )}
                    <div className="flex items-center gap-3 flex-wrap">
                        {assignedEmployee && (
                            <div className="flex items-center gap-1">
                                <Users className="w-3 h-3 text-indigo-400" />
                                <span className="text-[11px] text-indigo-500 dark:text-indigo-400 font-medium">
                                    {assignedEmployee.firstname} {assignedEmployee.lastname}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                            <span className="text-[11px] text-gray-400 dark:text-gray-600">
                                {formatDate(schedule.startdate)} → {formatDate(schedule.enddate)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ClipboardList className="w-3 h-3 text-gray-300 dark:text-gray-600" />
                            <span className="text-[11px] text-gray-400 dark:text-gray-600">
                                {completed}/{allTasks.length} tareas
                            </span>
                        </div>
                    </div>
                </div>

                {/* Acciones */}
                <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                        onClick={() => onToggle(schedule)}
                        title={schedule.isactive ? "Desactivar" : "Activar"}
                        className="p-1.5 rounded-lg transition-colors duration-150
                            hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.06)]"
                    >
                        {schedule.isactive
                            ? <ToggleRight className="w-5 h-5 text-emerald-500" />
                            : <ToggleLeft  className="w-5 h-5 text-gray-400" />
                        }
                    </button>
                    <button
                        onClick={() => onEdit(schedule)}
                        className="p-1.5 rounded-lg transition-colors duration-150
                            hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.06)]"
                    >
                        <Pencil className="w-4 h-4 text-gray-400 hover:text-indigo-500 transition-colors" />
                    </button>
                    <button
                        onClick={() => onDelete(schedule._id)}
                        className="p-1.5 rounded-lg transition-colors duration-150
                            hover:bg-red-50 dark:hover:bg-[rgba(239,68,68,0.08)]"
                    >
                        <Trash2 className="w-4 h-4 text-gray-300 dark:text-gray-600 hover:text-red-400 transition-colors" />
                    </button>
                    <button
                        onClick={() => setOpen(p => !p)}
                        className="p-1.5 rounded-lg transition-colors duration-150
                            hover:bg-gray-100 dark:hover:bg-[rgba(255,255,255,0.06)]"
                    >
                        {open
                            ? <ChevronUp   className="w-4 h-4 text-gray-400" />
                            : <ChevronDown className="w-4 h-4 text-gray-400" />
                        }
                    </button>
                </div>
            </div>

            {/* Detalle de días */}
            {open && (
                <div className="border-t border-gray-50 dark:border-[rgba(255,255,255,0.04)] px-4 py-3 flex flex-col gap-2">
                    {schedule.schedule?.map(day => (
                        <div key={day._id} className="flex flex-col gap-1.5">
                            <p className="text-[11px] font-semibold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
                                {day.day}
                            </p>
                            {day.tasks.map(task => (
                                <div key={task._id}
                                    className="flex items-start gap-2 px-3 py-2 rounded-xl
                                        bg-gray-50 dark:bg-[rgba(255,255,255,0.03)]">
                                    {task.completed
                                        ? <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-500 flex-shrink-0" />
                                        : <Circle       className="w-3.5 h-3.5 mt-0.5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                                    }
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium text-gray-700 dark:text-[rgba(255,255,255,0.7)]">
                                            {task.title}
                                        </p>
                                        {task.description && (
                                            <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-0.5">
                                                {task.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-[11px] text-gray-400 dark:text-gray-600 flex-shrink-0">
                                        {task.starttime}–{task.endtime}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Editor de tareas dentro del formulario ────────────────────────────────
const TaskEditor = ({ task, index, onChange, onRemove, canRemove }) => (
    <div className="flex flex-col gap-2 p-3 rounded-xl
        bg-gray-50 border border-gray-100
        dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.05)]">
        <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                Tarea {index + 1}
            </p>
            {canRemove && (
                <button onClick={onRemove} className="text-red-400 hover:text-red-500 transition-colors">
                    <X className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
        <input
            placeholder="Título de la tarea *"
            value={task.title}
            onChange={e => onChange("title", e.target.value)}
            className="input-field"
        />
        <input
            placeholder="Descripción (opcional)"
            value={task.description}
            onChange={e => onChange("description", e.target.value)}
            className="input-field"
        />
        <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Inicio
                </label>
                <input type="time" value={task.starttime}
                    onChange={e => onChange("starttime", e.target.value)}
                    className="input-field" />
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                    Fin
                </label>
                <input type="time" value={task.endtime}
                    onChange={e => onChange("endtime", e.target.value)}
                    className="input-field" />
            </div>
        </div>
    </div>
)

// ── Editor de día dentro del formulario ──────────────────────────────────
const DayEditor = ({ dayItem, dayIndex, onChange, onRemove, canRemove }) => {
    const updateTask = (taskIndex, field, value) => {
        const updated = dayItem.tasks.map((t, i) =>
            i === taskIndex ? { ...t, [field]: value } : t
        )
        onChange(dayIndex, "tasks", updated)
    }

    const addTask = () => {
        onChange(dayIndex, "tasks", [...dayItem.tasks, emptyTask()])
    }

    const removeTask = (taskIndex) => {
        onChange(dayIndex, "tasks", dayItem.tasks.filter((_, i) => i !== taskIndex))
    }

    return (
        <div className="rounded-2xl overflow-hidden border
            border-gray-100 dark:border-[rgba(255,255,255,0.06)]
            bg-white dark:bg-[rgba(255,255,255,0.02)]">

            {/* Header del día */}
            <div className="flex items-center justify-between px-4 py-3 border-b
                border-gray-50 dark:border-[rgba(255,255,255,0.04)]">
                <div className="flex items-center gap-2">
                    <CalendarDays className="w-4 h-4 text-indigo-400" />
                    <select
                        value={dayItem.day}
                        onChange={e => onChange(dayIndex, "day", e.target.value)}
                        className="text-sm font-semibold bg-transparent outline-none cursor-pointer
                            text-gray-900 dark:text-white"
                    >
                        {DAYS.map(d => (
                            <option key={d} value={d}
                                className="bg-white dark:bg-[#1a1a2e] text-gray-900 dark:text-white">
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
                {canRemove && (
                    <button onClick={() => onRemove(dayIndex)}
                        className="text-xs text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                        <X className="w-3.5 h-3.5" /> Eliminar día
                    </button>
                )}
            </div>

            {/* Tareas */}
            <div className="p-4 flex flex-col gap-3">
                {dayItem.tasks.map((task, taskIndex) => (
                    <TaskEditor
                        key={taskIndex}
                        task={task}
                        index={taskIndex}
                        onChange={(field, value) => updateTask(taskIndex, field, value)}
                        onRemove={() => removeTask(taskIndex)}
                        canRemove={dayItem.tasks.length > 1}
                    />
                ))}
                <button
                    onClick={addTask}
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-500
                        hover:text-indigo-600 transition-colors duration-150 w-fit"
                >
                    <Plus className="w-3.5 h-3.5" /> Agregar tarea
                </button>
            </div>
        </div>
    )
}

// ── Formulario de creación / edición ─────────────────────────────────────
const ScheduleForm = ({ employees, onSubmit, onCancel, editingSchedule }) => {
    const isEdit = !!editingSchedule

    const [form, setForm] = useState({
        title:       isEdit ? editingSchedule.title       : "",
        description: isEdit ? editingSchedule.description : "",
        employee:    isEdit ? (editingSchedule.employee?._id || editingSchedule.employee || "") : "",
        startdate:   isEdit ? editingSchedule.startdate?.split("T")[0] : "",
        enddate:     isEdit ? editingSchedule.enddate?.split("T")[0]   : "",
        isactive:    isEdit ? editingSchedule.isactive    : true,
        schedule:    isEdit
            ? editingSchedule.schedule.map(d => ({
                day:   d.day,
                tasks: d.tasks.map(t => ({
                    title:       t.title,
                    description: t.description || "",
                    starttime:   t.starttime,
                    endtime:     t.endtime
                }))
            }))
            : [emptyDay()]
    })

    const updateDay = (dayIndex, field, value) => {
        setForm(p => ({
            ...p,
            schedule: p.schedule.map((d, i) =>
                i === dayIndex ? { ...d, [field]: value } : d
            )
        }))
    }

    const addDay = () => setForm(p => ({ ...p, schedule: [...p.schedule, emptyDay()] }))

    const removeDay = (dayIndex) => {
        setForm(p => ({ ...p, schedule: p.schedule.filter((_, i) => i !== dayIndex) }))
    }

    const handleSubmit = () => {
        if (!form.title || !form.employee || !form.startdate || !form.enddate) return
        const payload = isEdit
            ? { ...form, scheduleID: editingSchedule._id }
            : form
        onSubmit(payload)
    }

    return (
        <div className="flex flex-col gap-5">

            {/* Datos generales */}
            <div className="rounded-2xl p-5 flex flex-col gap-4
                bg-gray-50 border border-gray-100
                dark:bg-[rgba(255,255,255,0.02)] dark:border-[rgba(255,255,255,0.06)]">

                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                    Información general
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                        <input
                            placeholder="Título del horario *"
                            value={form.title}
                            onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                            className="input-field w-full"
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <input
                            placeholder="Descripción (opcional)"
                            value={form.description}
                            onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                            className="input-field w-full"
                        />
                    </div>

                    {/* Empleado */}
                    <div className="sm:col-span-2">
                        <select
                            value={form.employee}
                            onChange={e => setForm(p => ({ ...p, employee: e.target.value }))}
                            className="input-field w-full"
                        >
                            <option value="">Seleccionar empleado *</option>
                            {(employees || []).map(emp => (
                                <option key={emp._id} value={emp._id}
                                    className="bg-white dark:bg-[#1a1a2e]">
                                    {emp.firstname} {emp.lastname}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Fechas */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-semibold uppercase tracking-wider
                            text-gray-400 dark:text-gray-500">
                            Fecha inicio *
                        </label>
                        <input type="date" value={form.startdate}
                            onChange={e => setForm(p => ({ ...p, startdate: e.target.value }))}
                            className="input-field w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-semibold uppercase tracking-wider
                            text-gray-400 dark:text-gray-500">
                            Fecha fin *
                        </label>
                        <input type="date" value={form.enddate}
                            onChange={e => setForm(p => ({ ...p, enddate: e.target.value }))}
                            className="input-field w-full" />
                    </div>

                    {/* Activo */}
                    <div className="sm:col-span-2 flex items-center gap-3">
                        <button
                            onClick={() => setForm(p => ({ ...p, isactive: !p.isactive }))}
                            className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400"
                        >
                            {form.isactive
                                ? <ToggleRight className="w-5 h-5 text-emerald-500" />
                                : <ToggleLeft  className="w-5 h-5 text-gray-400" />
                            }
                            Horario {form.isactive ? "activo" : "inactivo"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Días y tareas */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                        Días y tareas
                    </p>
                    <button
                        onClick={addDay}
                        className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl
                            bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100
                            dark:bg-[rgba(99,102,241,0.1)] dark:text-indigo-400
                            dark:border-[rgba(99,102,241,0.2)] dark:hover:bg-[rgba(99,102,241,0.15)]
                            transition-colors duration-150"
                    >
                        <Plus className="w-3.5 h-3.5" /> Agregar día
                    </button>
                </div>

                {form.schedule.map((day, i) => (
                    <DayEditor
                        key={i}
                        dayItem={day}
                        dayIndex={i}
                        onChange={updateDay}
                        onRemove={removeDay}
                        canRemove={form.schedule.length > 1}
                    />
                ))}
            </div>

            {/* Botones */}
            <div className="flex gap-3 sticky bottom-0 pb-4 pt-2
                bg-white dark:bg-[#0f0f1a]">
                <button
                    onClick={handleSubmit}
                    disabled={!form.title || !form.employee || !form.startdate || !form.enddate}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
                        text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed
                        hover:opacity-90 active:scale-95"
                    style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                    <CheckCircle2 className="w-4 h-4" />
                    {isEdit ? "Guardar cambios" : "Crear horario"}
                </button>
                <button
                    onClick={onCancel}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium
                        border transition-all duration-200
                        text-gray-500 border-gray-200 hover:bg-gray-50
                        dark:text-gray-400 dark:border-[rgba(255,255,255,0.08)]
                        dark:hover:bg-[rgba(255,255,255,0.04)]"
                >
                    <X className="w-4 h-4" /> Cancelar
                </button>
            </div>
        </div>
    )
}

// ── Página principal ──────────────────────────────────────────────────────
export const HRSchedulePage = () => {
    const dispatch = useDispatch()
    const { toast }     = useToast()
    const scheduleState = useSelector(s => s.HRScheduleReducer)
    const employeesState = useSelector(s => s.HREmployeesPageReducer)

    // "list" | "create" | "edit"
    const [view, setView] = useState("list")
    const [editingSchedule, setEditingSchedule] = useState(null)

    useEffect(() => {
        dispatch(HandleHRSchedule({ type: "GetAll" }))
        dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
    }, [])

    const handleCreate = async (data) => {
        const res = await dispatch(HandleHRSchedule({ type: "Create", data }))
        if (res.payload?.success) {
            toast({ variant: "success", title: "Horario creado", description: res.payload.message })
            setView("list")
        } else {
            toast({ variant: "destructive", title: "Error", description: res.payload?.message })
        }
    }

    const handleUpdate = async (data) => {
        const res = await dispatch(HandleHRSchedule({ type: "Update", data }))
        if (res.payload?.success) {
            toast({ variant: "success", title: "Horario actualizado", description: res.payload.message })
            setView("list")
            setEditingSchedule(null)
        } else {
            toast({ variant: "destructive", title: "Error", description: res.payload?.message })
        }
    }

    const handleDelete = async (scheduleID) => {
        const res = await dispatch(HandleHRSchedule({ type: "Delete", data: { scheduleID } }))
        if (res.payload?.success) {
            toast({ variant: "success", title: "Horario eliminado" })
        } else {
            toast({ variant: "destructive", title: "Error", description: res.payload?.message })
        }
    }

    const handleToggle = async (schedule) => {
        const res = await dispatch(HandleHRSchedule({
            type: "Update",
            data: { scheduleID: schedule._id, isactive: !schedule.isactive }
        }))
        if (res.payload?.success) {
            toast({
                variant: "success",
                title: `Horario ${!schedule.isactive ? "activado" : "desactivado"}`
            })
        }
    }

    const handleEdit = (schedule) => {
        setEditingSchedule(schedule)
        setView("edit")
    }

    const schedules  = scheduleState.data || []
    const employees  = employeesState.data || []
    const isLoading  = scheduleState.isLoading

    if (isLoading && schedules.length === 0) return <Loading />

    return (
        <div className="flex flex-col w-full px-4 py-6 gap-6 overflow-y-auto
            bg-white dark:bg-[#0f0f1a] min-h-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] mb-1
                        text-indigo-500 dark:text-indigo-400">
                        Gestión de personal
                    </p>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight
                            text-gray-900 dark:text-white">
                            {view === "list"   ? "Horarios"         : ""}
                            {view === "create" ? "Nuevo horario"    : ""}
                            {view === "edit"   ? "Editar horario"   : ""}
                        </h1>
                        {view === "list" && (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold
                                bg-indigo-50 text-indigo-600 border border-indigo-100
                                dark:bg-[rgba(99,102,241,0.12)] dark:text-indigo-300
                                dark:border-[rgba(99,102,241,0.2)]">
                                {schedules.length} total
                            </span>
                        )}
                    </div>
                </div>

                {view === "list" && (
                    <button
                        onClick={() => setView("create")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl self-start sm:self-auto
                            text-sm font-semibold text-white transition-all duration-200
                            hover:opacity-90 active:scale-95"
                        style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                    >
                        <Plus className="w-4 h-4" />
                        Nuevo horario
                    </button>
                )}
            </div>

            <div className="h-px w-full bg-gray-100 dark:bg-[rgba(99,102,241,0.08)]" />

            {/* ── Vista Lista ──────────────────────────────────────────── */}
            {view === "list" && (
                <div className="flex flex-col gap-3">
                    {schedules.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center
                                bg-indigo-50 dark:bg-[rgba(99,102,241,0.1)]">
                                <ClipboardList className="w-7 h-7 text-indigo-300 dark:text-indigo-500" />
                            </div>
                            <p className="text-base font-semibold text-gray-400 dark:text-gray-500">
                                Sin horarios creados
                            </p>
                            <p className="text-sm text-gray-300 dark:text-gray-700 text-center max-w-xs">
                                Crea el primer horario y asígnalo a un empleado
                            </p>
                        </div>
                    ) : (
                        schedules.map(s => (
                            <ScheduleCard
                                key={s._id}
                                schedule={s}
                                employees={employees}
                                onDelete={handleDelete}
                                onToggle={handleToggle}
                                onEdit={handleEdit}
                            />
                        ))
                    )}
                </div>
            )}

            {/* ── Vista Crear ──────────────────────────────────────────── */}
            {view === "create" && (
                <ScheduleForm
                    employees={employees}
                    onSubmit={handleCreate}
                    onCancel={() => setView("list")}
                    editingSchedule={null}
                />
            )}

            {/* ── Vista Editar ─────────────────────────────────────────── */}
            {view === "edit" && editingSchedule && (
                <ScheduleForm
                    employees={employees}
                    onSubmit={handleUpdate}
                    onCancel={() => { setView("list"); setEditingSchedule(null) }}
                    editingSchedule={editingSchedule}
                />
            )}
        </div>
    )
}
