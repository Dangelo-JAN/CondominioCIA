import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useIsDark } from "../../../hooks/useIsDark.js"
import { Loading } from "../../../components/common/loading.jsx"
import {
    HandleGetHRLeaves,
    HandleUpdateHRLeaveStatus,
    HandleDeleteLeaveByHR,
    HandleCreateLeaveByHR,
    HandleUpdateLeaveByHR
} from "../../../redux/Thunks/HRLeavesThunk.js"
import { HandleGetHREmployees } from "../../../redux/Thunks/HREmployeesThunk.js"
import { Calendar, Filter, ChevronDown, CheckCircle, XCircle, Clock, Plus, Edit, Trash2, Eye } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { useForm } from "../../../hooks/useForm.js"
import { Button } from "../../../components/ui/button.jsx"
import { Input } from "../../../components/ui/input.jsx"
import { Label } from "../../../components/ui/label.jsx"

const LEAVE_TYPES = ["Vacaciones", "Reposo Médico", "Personal", "Otro"]
const STATUS_OPTIONS = [
    { value: "all", label: "Todos" },
    { value: "Pending", label: "Pendiente" },
    { value: "Approved", label: "Aprobado" },
    { value: "Rejected", label: "Rechazado" }
]

const RequestForm = ({ initialData, employees, onSubmit, onClose, isLoading }) => {
    const isDark = useIsDark()
    const { formData, handleChange, setFormData } = useForm({
        employeeID: initialData?.employee?._id || "",
        leavetype: initialData?.leavetype || "Personal",
        startdate: initialData?.startdate?.split("T")[0] || "",
        enddate: initialData?.enddate?.split("T")[0] || "",
        title: initialData?.title || "",
        reason: initialData?.reason || ""
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                employeeID: initialData.employee?._id || "",
                leavetype: initialData.leavetype || "Personal",
                startdate: initialData.startdate?.split("T")[0] || "",
                enddate: initialData.enddate?.split("T")[0] || "",
                title: initialData.title || "",
                reason: initialData.reason || ""
            })
        }
    }, [initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Empleado - solo mostrar si es creación o edición por HR */}
            {!initialData && (
                <div className="space-y-2">
                    <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                        Empleado
                    </Label>
                    <select
                        name="employeeID"
                        value={formData.employeeID}
                        onChange={handleChange}
                        required
                        className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all duration-200 appearance-none
                            bg-gray-50 border border-gray-200 text-gray-900
                            focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100
                            dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                            dark:focus:border-[rgba(245,158,11,0.5)] dark:focus:bg-[rgba(245,158,11,0.06)]`}
                    >
                        <option value="">Seleccionar empleado</option>
                        {employees?.map(emp => (
                            <option key={emp._id} value={emp._id}>
                                {emp.firstname} {emp.lastname}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Tipo de ausencia */}
            <div className="space-y-2">
                <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                    Tipo de Ausencia
                </Label>
                <select
                    name="leavetype"
                    value={formData.leavetype}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none transition-all duration-200 appearance-none
                        bg-gray-50 border border-gray-200 text-gray-900
                        focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100
                        dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                        dark:focus:border-[rgba(245,158,11,0.5)] dark:focus:bg-[rgba(245,158,11,0.06)]`}
                >
                    {LEAVE_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            {/* Fechas */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                        Fecha Inicio
                    </Label>
                    <Input
                        type="date"
                        name="startdate"
                        value={formData.startdate}
                        onChange={handleChange}
                        required
                        className={`rounded-xl`}
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                        Fecha Fin
                    </Label>
                    <Input
                        type="date"
                        name="enddate"
                        value={formData.enddate}
                        onChange={handleChange}
                        required
                        className={`rounded-xl`}
                    />
                </div>
            </div>

            {/* Título */}
            <div className="space-y-2">
                <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                    Título
                </Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ej: Solicitud de vacaciones"
                    required
                    className={`rounded-xl`}
                />
            </div>

            {/* Razón */}
            <div className="space-y-2">
                <Label className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                    Razón
                </Label>
                <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Describe la razón de tu solicitud..."
                    required
                    rows={3}
                    className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition-all duration-200 resize-none
                        bg-gray-50 border border-gray-200 text-gray-900
                        focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-100
                        dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                        dark:focus:border-[rgba(245,158,11,0.5)] dark:focus:bg-[rgba(245,158,11,0.06)]`}
                />
            </div>

            {/* Botones */}
            <div className="flex justify-end gap-3 pt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="rounded-xl"
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                    {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear"}
                </Button>
            </div>
        </form>
    )
}

const RequestDetailsDialog = ({ request, onClose, onApprove, onReject, onEdit, onDelete, isLoading }) => {
    const isDark = useIsDark()

    if (!request) return null

    const getStatusBadge = (status) => {
        const config = {
            Pending: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.30)", color: "#fbbf24", label: "Pendiente" },
            Approved: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.30)", color: "#34d399", label: "Aprobado" },
            Rejected: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.30)", color: "#f87171", label: "Rechazado" }
        }
        const c = config[status] || config.Pending
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                {status === "Pending" ? <Clock className="w-3 h-3" /> : status === "Approved" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {c.label}
            </span>
        )
    }

    return (
        <Dialog.Root open={true} onOpenChange={onClose}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 rounded-2xl z-50
                    bg-white dark:bg-[#0f0f1a] border border-gray-200 dark:border-[rgba(255,255,255,0.12)]
                    shadow-xl max-h-[90vh] overflow-y-auto">
                    <Dialog.Title className="text-xl font-bold mb-4" style={{ color: isDark ? "#fff" : "#111827" }}>
                        Detalles de Solicitud
                    </Dialog.Title>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                                    style={{ background: isDark ? "rgba(245,158,11,0.15)" : "#fef3c7", color: isDark ? "#fbbf24" : "#d97706" }}>
                                    {request.employee?.firstname?.[0]}{request.employee?.lastname?.[0]}
                                </div>
                                <div>
                                    <p className="font-semibold" style={{ color: isDark ? "#fff" : "#111827" }}>
                                        {request.employee?.firstname} {request.employee?.lastname}
                                    </p>
                                    <p className="text-sm" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#6b7280" }}>
                                        {request.employee?.department?.name || "Sin departamento"}
                                    </p>
                                </div>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f9fafb" }}>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Tipo</p>
                                <p className="font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>{request.leavetype}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Título</p>
                                <p className="font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>{request.title}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Inicio</p>
                                <p className="font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                                    {new Date(request.startdate).toLocaleDateString("es-ES")}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Fin</p>
                                <p className="font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                                    {new Date(request.enddate).toLocaleDateString("es-ES")}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Razón</p>
                            <p className="p-3 rounded-xl text-sm" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f9fafb", color: isDark ? "rgba(255,255,255,0.8)" : "#374151" }}>
                                {request.reason}
                            </p>
                        </div>

                        {request.approvedby && (
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>
                                    {request.status === "Approved" ? "Aprobado por" : "Rechazado por"}
                                </p>
                                <p className="text-sm font-medium" style={{ color: isDark ? "#fff" : "#374151" }}>
                                    {request.approvedby.firstname} {request.approvedby.lastname}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Acciones */}
                    {request.status === "Pending" && (
                        <div className="flex justify-between mt-6 pt-4 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }}>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => onEdit(request)}
                                    variant="outline"
                                    className="rounded-xl text-amber-500 border-amber-500 hover:bg-amber-50"
                                >
                                    <Edit className="w-4 h-4 mr-1" /> Editar
                                </Button>
                                <Button
                                    onClick={() => onDelete(request._id)}
                                    variant="outline"
                                    className="rounded-xl text-red-500 border-red-500 hover:bg-red-50"
                                    disabled={isLoading}
                                >
                                    <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                                </Button>
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => onReject(request._id)}
                                    className="rounded-xl bg-red-500 hover:bg-red-600 text-white"
                                    disabled={isLoading}
                                >
                                    <XCircle className="w-4 h-4 mr-1" /> Rechazar
                                </Button>
                                <Button
                                    onClick={() => onApprove(request._id)}
                                    className="rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white"
                                    disabled={isLoading}
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" /> Aprobar
                                </Button>
                            </div>
                        </div>
                    )}

                    <Dialog.Close asChild>
                        <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#9ca3af" }}>
                            ✕
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export const HRRequestspage = () => {
    const isDark = useIsDark()
    const dispatch = useDispatch()
    const HRLeavesState = useSelector((state) => state.HRLeavesReducer)
    const HREmployeesState = useSelector((state) => state.HREmployeesPageReducer)

    const [employeeFilter, setEmployeeFilter] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [dateRange, setDateRange] = useState({ start: "", end: "" })

    // Dialog states
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null)

    const table_headings = ["Empleado", "Tipo", "Fechas", "Título", "Estado", "Acciones"]

    useEffect(() => {
        dispatch(HandleGetHRLeaves())
        dispatch(HandleGetHREmployees({ apiroute: "GETALL" }))
    }, [])

    const filteredLeaves = useMemo(() => {
        if (!HRLeavesState.data) return []

        return HRLeavesState.data.filter(leave => {
            if (employeeFilter && leave.employee?._id !== employeeFilter) return false
            if (statusFilter !== "all" && leave.status !== statusFilter) return false
            if (dateRange.start || dateRange.end) {
                const leaveStart = new Date(leave.startdate)
                if (dateRange.start && leaveStart < new Date(dateRange.start)) return false
                if (dateRange.end && leaveStart > new Date(dateRange.end)) return false
            }
            return true
        })
    }, [HRLeavesState.data, employeeFilter, statusFilter, dateRange])

    const getStatusBadge = (status) => {
        const config = {
            Pending: { bg: isDark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.10)", border: isDark ? "rgba(245,158,11,0.30)" : "rgba(245,158,11,0.25)", color: isDark ? "#fbbf24" : "#d97706", icon: Clock },
            Approved: { bg: isDark ? "rgba(16,185,129,0.12)" : "rgba(16,185,129,0.10)", border: isDark ? "rgba(16,185,129,0.30)" : "rgba(16,185,129,0.25)", color: isDark ? "#34d399" : "#059669", icon: CheckCircle },
            Rejected: { bg: isDark ? "rgba(239,68,68,0.12)" : "rgba(239,68,68,0.10)", border: isDark ? "rgba(239,68,68,0.30)" : "rgba(239,68,68,0.25)", color: isDark ? "#f87171" : "#dc2626", icon: XCircle }
        }
        const c = config[status] || config.Pending
        const Icon = c.icon
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                <Icon className="w-3 h-3" />
                {status === "Pending" ? "Pendiente" : status === "Approved" ? "Aprobado" : "Rechazado"}
            </span>
        )
    }

    const formatDateRange = (start, end) => {
        const startDate = new Date(start).toLocaleDateString("es-ES", { day: "2-digit", month: "short" })
        const endDate = new Date(end).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })
        return `${startDate} - ${endDate}`
    }

    // Handlers
    const handleCreate = async (formData) => {
        try {
            await dispatch(HandleCreateLeaveByHR(formData)).unwrap()
            setIsCreateOpen(false)
            dispatch(HandleGetHRLeaves())
        } catch (error) {
            console.error("Error al crear solicitud:", error)
        }
    }

    const handleEdit = (formData) => {
        dispatch(HandleUpdateLeaveByHR({ ...formData, leaveID: selectedRequest._id })).then(() => {
            setIsEditOpen(false)
            setSelectedRequest(null)
            dispatch(HandleGetHRLeaves())
        })
    }

    const handleApprove = (leaveID) => {
        const HRID = JSON.parse(localStorage.getItem("HRData"))?._id
        if (HRID) {
            dispatch(HandleUpdateHRLeaveStatus({ leaveID, status: "Approved", HRID })).then(() => {
                setIsDetailsOpen(false)
                setSelectedRequest(null)
                dispatch(HandleGetHRLeaves())
            })
        }
    }

    const handleReject = (leaveID) => {
        const HRID = JSON.parse(localStorage.getItem("HRData"))?._id
        if (HRID) {
            dispatch(HandleUpdateHRLeaveStatus({ leaveID, status: "Rejected", HRID })).then(() => {
                setIsDetailsOpen(false)
                setSelectedRequest(null)
                dispatch(HandleGetHRLeaves())
            })
        }
    }

    const handleDelete = (leaveID) => {
        if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
            dispatch(HandleDeleteLeaveByHR(leaveID)).then(() => {
                setIsDetailsOpen(false)
                setSelectedRequest(null)
                dispatch(HandleGetHRLeaves())
            })
        }
    }

    if (HRLeavesState.isLoading) {
        return <Loading />
    }

    const requestsCount = filteredLeaves?.length ?? 0

    return (
        <div className="w-full h-full flex flex-col gap-6 px-4 py-6 overflow-y-auto bg-white dark:bg-[#0f0f1a]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDark ? "#f59e0b" : "#d97706" }}>
                        Gestión de Solicitudes
                    </p>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight" style={{ color: isDark ? "#fff" : "#111827" }}>
                            Solicitudes de Ausencia
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: isDark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.10)", color: isDark ? "#fbbf24" : "#d97706" }}>
                            {requestsCount} total
                        </span>
                    </div>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" /> Nueva Solicitud
                </Button>
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: isDark ? "rgba(245,158,11,0.08)" : "#f3f4f6" }} />

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#6b7280" }}>
                        <Filter className="w-3 h-3 inline mr-1" /> Empleado
                    </label>
                    <div className="relative">
                        <select
                            value={employeeFilter}
                            onChange={(e) => setEmployeeFilter(e.target.value)}
                            className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none
                                bg-gray-50 border border-gray-200 text-gray-900
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                                dark:focus:border-[rgba(245,158,11,0.5)]`}
                        >
                            <option value="">Todos los empleados</option>
                            {HREmployeesState.data?.map(emp => (
                                <option key={emp._id} value={emp._id}>{emp.firstname} {emp.lastname}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }} />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full lg:w-48">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#6b7280" }}>Estado</label>
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none
                                bg-gray-50 border border-gray-200 text-gray-900
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                                dark:focus:border-[rgba(245,158,11,0.5)]`}
                        >
                            {STATUS_OPTIONS.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }} />
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#6b7280" }}>
                        <Calendar className="w-3 h-3 inline mr-1" /> Desde - Hasta
                    </label>
                    <div className="flex gap-2">
                        <input type="date" value={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                            className={`w-full rounded-xl px-3 py-2 text-sm outline-none
                                bg-gray-50 border border-gray-200 text-gray-900
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                                dark:focus:border-[rgba(245,158,11,0.5)]`}
                        />
                        <input type="date" value={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                            className={`w-full rounded-xl px-3 py-2 text-sm outline-none
                                bg-gray-50 border border-gray-200 text-gray-900
                                focus:border-amber-400 focus:ring-2 focus:ring-amber-100
                                dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                                dark:focus:border-[rgba(245,158,11,0.5)]`}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-col gap-3 flex-1 overflow-auto">
                <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "rgba(245,158,11,0.15)" : "#e5e7eb", background: isDark ? "rgba(245,158,11,0.05)" : "#f9fafb" }}>
                    <div className={`grid grid-cols-2 sm:grid-cols-6 gap-2 px-3 py-2`}>
                        {table_headings.map((item) => (
                            <div key={item} className="text-xs font-bold uppercase tracking-wider text-center px-2 py-1.5 rounded-lg"
                                style={{ color: isDark ? "#fbbf24" : "#d97706" }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "rgba(245,158,11,0.1)" : "#e5e7eb", background: isDark ? "rgba(255,255,255,0.02)" : "#fff" }}>
                    {requestsCount === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: isDark ? "rgba(245,158,11,0.1)" : "#fef3c7" }}>
                                <Calendar className="w-6 h-6" style={{ color: isDark ? "#f59e0b" : "#d97706" }} />
                            </div>
                            <p className="text-sm font-medium" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>No hay solicitudes de ausencia</p>
                        </div>
                    ) : (
                        filteredLeaves.map((leave, index) => (
                            <div key={leave._id ?? index} className="grid grid-cols-2 sm:grid-cols-6 gap-2 px-3 py-3 items-center border-b last:border-b-0"
                                style={{ borderColor: isDark ? "rgba(245,158,11,0.08)" : "#f3f4f6" }}>
                                {/* Empleado */}
                                <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                                        style={{ background: isDark ? "rgba(245,158,11,0.15)" : "#fef3c7", color: isDark ? "#fbbf24" : "#d97706" }}>
                                        {leave.employee?.firstname?.[0]}{leave.employee?.lastname?.[0]}
                                    </div>
                                    <p className="text-sm font-semibold truncate" style={{ color: isDark ? "#fff" : "#374151" }}>
                                        {leave.employee ? `${leave.employee.firstname} ${leave.employee.lastname}` : "Sin asignar"}
                                    </p>
                                </div>

                                {/* Tipo */}
                                <div className="min-w-0">
                                    <p className="text-sm truncate" style={{ color: isDark ? "rgba(255,255,255,0.7)" : "#6b7280" }}>{leave.leavetype}</p>
                                </div>

                                {/* Fechas */}
                                <div className="hidden sm:block min-w-0">
                                    <p className="text-sm truncate" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{formatDateRange(leave.startdate, leave.enddate)}</p>
                                </div>

                                {/* Título */}
                                <div className="hidden sm:block min-w-0">
                                    <p className="text-sm truncate" style={{ color: isDark ? "rgba(255,255,255,0.6)" : "#4b5563" }} title={leave.title}>{leave.title}</p>
                                </div>

                                {/* Estado */}
                                <div className="flex justify-center">{getStatusBadge(leave.status)}</div>

                                {/* Acciones */}
                                <div className="flex justify-center gap-1">
                                    <button onClick={() => { setSelectedRequest(leave); setIsDetailsOpen(true) }}
                                        className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-[rgba(245,158,11,0.1)] transition-colors" title="Ver detalles">
                                        <Eye className="w-4 h-4" style={{ color: isDark ? "#f59e0b" : "#d97706" }} />
                                    </button>
                                    {leave.status === "Pending" && (
                                        <>
                                            <button onClick={() => { setSelectedRequest(leave); setIsEditOpen(true) }}
                                                className="p-1.5 rounded-lg hover:bg-amber-100 dark:hover:bg-[rgba(245,158,11,0.1)] transition-colors" title="Editar">
                                                <Edit className="w-4 h-4" style={{ color: isDark ? "#f59e0b" : "#d97706" }} />
                                            </button>
                                            <button onClick={() => handleDelete(leave._id)}
                                                className="p-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-[rgba(239,68,68,0.1)] transition-colors" title="Eliminar">
                                                <Trash2 className="w-4 h-4" style={{ color: isDark ? "#ef4444" : "#dc2626" }} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Create Dialog */}
            <Dialog.Root open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 rounded-2xl z-50
                        bg-white dark:bg-[#0f0f1a] border border-gray-200 dark:border-[rgba(255,255,255,0.12)] shadow-xl max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-xl font-bold mb-4" style={{ color: isDark ? "#fff" : "#111827" }}>Nueva Solicitud de Ausencia</Dialog.Title>
                        <RequestForm employees={HREmployeesState.data} onSubmit={handleCreate} onClose={() => setIsCreateOpen(false)} isLoading={HRLeavesState.isLoading} />
                        <Dialog.Close asChild>
                            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#9ca3af" }}>✕</button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Edit Dialog */}
            <Dialog.Root open={isEditOpen} onOpenChange={setIsEditOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 rounded-2xl z-50
                        bg-white dark:bg-[#0f0f1a] border border-gray-200 dark:border-[rgba(255,255,255,0.12)] shadow-xl max-h-[90vh] overflow-y-auto">
                        <Dialog.Title className="text-xl font-bold mb-4" style={{ color: isDark ? "#fff" : "#111827" }}>Editar Solicitud</Dialog.Title>
                        <RequestForm initialData={selectedRequest} employees={HREmployeesState.data} onSubmit={handleEdit} onClose={() => { setIsEditOpen(false); setSelectedRequest(null) }} isLoading={HRLeavesState.isLoading} />
                        <Dialog.Close asChild>
                            <button className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#9ca3af" }}>✕</button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>

            {/* Details Dialog */}
            {isDetailsOpen && selectedRequest && (
                <RequestDetailsDialog
                    request={selectedRequest}
                    onClose={() => { setIsDetailsOpen(false); setSelectedRequest(null) }}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onEdit={(req) => { setIsDetailsOpen(false); setSelectedRequest(req); setIsEditOpen(true) }}
                    onDelete={handleDelete}
                    isLoading={HRLeavesState.isLoading}
                />
            )}
        </div>
    )
}