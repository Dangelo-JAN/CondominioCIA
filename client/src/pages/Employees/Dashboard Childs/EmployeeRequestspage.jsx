import { useEffect, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useIsDark } from "../../../hooks/useIsDark.js"
import { Loading } from "../../../components/common/loading.jsx"
import { 
    HandleGetEmployeeLeaves, 
    HandleCreateEmployeeLeave,
    HandleUpdateEmployeeLeave,
    HandleDeleteEmployeeLeave
} from "../../../redux/Thunks/HRLeavesThunk.js"
import { Calendar, Plus, Edit, Trash2, Eye, Clock, CheckCircle, XCircle } from "lucide-react"
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

const LeaveRequestForm = ({ initialData, onSubmit, onClose, isLoading }) => {
    const isDark = useIsDark()
    const { formData, handleChange, setFormData } = useForm({
        leavetype: initialData?.leavetype || "Personal",
        startdate: initialData?.startdate?.split("T")[0] || "",
        enddate: initialData?.enddate?.split("T")[0] || "",
        title: initialData?.title || "",
        reason: initialData?.reason || ""
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
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
                        focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100
                        dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                        dark:focus:border-[rgba(6,182,212,0.5)] dark:focus:bg-[rgba(6,182,212,0.06)]`}
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
                        focus:border-cyan-400 focus:bg-white focus:ring-2 focus:ring-cyan-100
                        dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                        dark:focus:border-[rgba(6,182,212,0.5)] dark:focus:bg-[rgba(6,182,212,0.06)]`}
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
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600"
                >
                    {isLoading ? "Guardando..." : initialData ? "Actualizar" : "Crear Solicitud"}
                </Button>
            </div>
        </form>
    )
}

const RequestDetailsDialog = ({ request, onClose, onEdit, onDelete, isLoading }) => {
    const isDark = useIsDark()

    if (!request) return null

    const getStatusBadge = (status) => {
        const config = {
            Pending: { bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.30)", color: "#fbbf24", label: "Pendiente", icon: Clock },
            Approved: { bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.30)", color: "#34d399", label: "Aprobado", icon: CheckCircle },
            Rejected: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.30)", color: "#f87171", label: "Rechazado", icon: XCircle }
        }
        const c = config[status] || config.Pending
        const Icon = c.icon
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>
                <Icon className="w-3 h-3" />
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
                        Detalles de mi Solicitud
                    </Dialog.Title>

                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Tipo de Ausencia</p>
                                <p className="font-medium mt-1" style={{ color: isDark ? "#fff" : "#374151" }}>{request.leavetype}</p>
                            </div>
                            {getStatusBadge(request.status)}
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4 rounded-xl" style={{ background: isDark ? "rgba(255,255,255,0.04)" : "#f9fafb" }}>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Título</p>
                                <p className="font-medium mt-1" style={{ color: isDark ? "#fff" : "#374151" }}>{request.title}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Fecha Inicio</p>
                                <p className="font-medium mt-1" style={{ color: isDark ? "#fff" : "#374151" }}>
                                    {new Date(request.startdate).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Fecha Fin</p>
                                <p className="font-medium mt-1" style={{ color: isDark ? "#fff" : "#374151" }}>
                                    {new Date(request.enddate).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
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
                            <div className="p-3 rounded-xl" style={{ background: isDark ? "rgba(6,182,212,0.1)" : "#ecfeff" }}>
                                <p className="text-xs uppercase tracking-wider" style={{ color: isDark ? "rgba(6,182,212,0.6)" : "#0891b2" }}>
                                    {request.status === "Approved" ? "Aprobado por" : "Rechazado por"}
                                </p>
                                <p className="font-medium mt-1" style={{ color: isDark ? "#22d3ee" : "#0e7490" }}>
                                    {request.approvedby.firstname} {request.approvedby.lastname}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Acciones - solo si está Pending */}
                    {request.status === "Pending" && (
                        <div className="flex justify-end gap-2 mt-6 pt-4 border-t" style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb" }}>
                            <Button
                                onClick={() => onDelete(request._id)}
                                variant="outline"
                                className="rounded-xl text-red-500 border-red-500 hover:bg-red-50"
                                disabled={isLoading}
                            >
                                <Trash2 className="w-4 h-4 mr-1" /> Eliminar
                            </Button>
                            <Button
                                onClick={() => onEdit(request)}
                                className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                            >
                                <Edit className="w-4 h-4 mr-1" /> Editar
                            </Button>
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

export const EmployeeRequestspage = () => {
    const isDark = useIsDark()
    const dispatch = useDispatch()
    const HRLeavesState = useSelector((state) => state.HRLeavesReducer)
    
    const [statusFilter, setStatusFilter] = useState("all")
    
    // Dialog states
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null)

    const table_headings = ["Tipo", "Fechas", "Título", "Estado", "Acciones"]
    
    useEffect(() => {
        dispatch(HandleGetEmployeeLeaves())
    }, [])

    const filteredLeaves = useMemo(() => {
        if (!HRLeavesState.data) return []
        
        return HRLeavesState.data.filter(leave => {
            if (statusFilter !== "all" && leave.status !== statusFilter) return false
            return true
        })
    }, [HRLeavesState.data, statusFilter])

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
    const handleCreate = (formData) => {
        dispatch(HandleCreateEmployeeLeave(formData)).then(() => {
            setIsCreateOpen(false)
            dispatch(HandleGetEmployeeLeaves())
        })
    }

    const handleEdit = (formData) => {
        dispatch(HandleUpdateEmployeeLeave({ ...formData, leaveID: selectedRequest._id })).then(() => {
            setIsEditOpen(false)
            setSelectedRequest(null)
            dispatch(HandleGetEmployeeLeaves())
        })
    }

    const handleDelete = (leaveID) => {
        if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
            dispatch(HandleDeleteEmployeeLeave(leaveID)).then(() => {
                setIsDetailsOpen(false)
                setSelectedRequest(null)
                dispatch(HandleGetEmployeeLeaves())
            })
        }
    }

    if (HRLeavesState.isLoading) {
        return <Loading />
    }

    const requestsCount = filteredLeaves?.length ?? 0
    const pendingCount = HRLeavesState.data?.filter(l => l.status === "Pending").length ?? 0
    const approvedCount = HRLeavesState.data?.filter(l => l.status === "Approved").length ?? 0
    const rejectedCount = HRLeavesState.data?.filter(l => l.status === "Rejected").length ?? 0
    
    return (
        <div className="w-full h-full flex flex-col gap-6 px-4 py-6 overflow-y-auto bg-white dark:bg-[#0f0f1a]">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: isDark ? "#06b6d4" : "#0891b2" }}>
                        Mis Solicitudes
                    </p>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl xl:text-3xl font-bold tracking-tight" style={{ color: isDark ? "#fff" : "#111827" }}>
                            Solicitudes de Ausencia
                        </h1>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                            style={{ background: isDark ? "rgba(6,182,212,0.12)" : "rgba(6,182,212,0.10)", color: isDark ? "#22d3ee" : "#0891b2" }}>
                            {requestsCount} total
                        </span>
                    </div>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white"
                >
                    <Plus className="w-4 h-4 mr-2" /> Nueva Solicitud
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border" style={{ background: isDark ? "rgba(245,158,11,0.05)" : "#fffbeb", borderColor: isDark ? "rgba(245,158,11,0.2)" : "#fcd34d" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "#fbbf24" : "#d97706" }}>Pendientes</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: isDark ? "#fff" : "#111827" }}>{pendingCount}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: isDark ? "rgba(16,185,129,0.05)" : "#ecfdf5", borderColor: isDark ? "rgba(16,185,129,0.2)" : "#6ee7b7" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "#34d399" : "#059669" }}>Aprobadas</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: isDark ? "#fff" : "#111827" }}>{approvedCount}</p>
                </div>
                <div className="p-4 rounded-xl border" style={{ background: isDark ? "rgba(239,68,68,0.05)" : "#fef2f2", borderColor: isDark ? "rgba(239,68,68,0.2)" : "#fca5a5" }}>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "#f87171" : "#dc2626" }}>Rechazadas</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: isDark ? "#fff" : "#111827" }}>{rejectedCount}</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full" style={{ background: isDark ? "rgba(6,182,212,0.08)" : "#f3f4f6" }} />

            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col gap-1.5 w-full lg:w-48">
                    <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: isDark ? "rgba(255,255,255,0.5)" : "#6b7280" }}>Estado</label>
                    <div className="relative">
                        <select 
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={`w-full rounded-xl px-3 py-2.5 text-sm outline-none appearance-none
                                bg-gray-50 border border-gray-200 text-gray-900
                                focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100
                                dark:bg-[rgba(255,255,255,0.04)] dark:border-[rgba(255,255,255,0.08)] dark:text-white
                                dark:focus:border-[rgba(6,182,212,0.5)]`}
                        >
                            {STATUS_OPTIONS.map(opt => (<option key={opt.value} value={opt.value}>{opt.label}</option>))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="flex flex-col gap-3 flex-1 overflow-auto">
                <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "rgba(6,182,212,0.15)" : "#e5e7eb", background: isDark ? "rgba(6,182,212,0.05)" : "#f9fafb" }}>
                    <div className={`grid grid-cols-2 sm:grid-cols-5 gap-2 px-3 py-2`}>
                        {table_headings.map((item) => (
                            <div key={item} className="text-xs font-bold uppercase tracking-wider text-center px-2 py-1.5 rounded-lg"
                                style={{ color: isDark ? "#06b6d4" : "#0891b2" }}>
                                {item}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full rounded-xl overflow-hidden border" style={{ borderColor: isDark ? "rgba(6,182,212,0.1)" : "#e5e7eb", background: isDark ? "rgba(255,255,255,0.02)" : "#fff" }}>
                    {requestsCount === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 gap-3">
                            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: isDark ? "rgba(6,182,212,0.1)" : "#cffafe" }}>
                                <Calendar className="w-6 h-6" style={{ color: isDark ? "#06b6d4" : "#67e8f9" }} />
                            </div>
                            <p className="text-sm font-medium" style={{ color: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af" }}>No tienes solicitudes de ausencia</p>
                            <Button
                                onClick={() => setIsCreateOpen(true)}
                                className="rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white text-sm"
                            >
                                <Plus className="w-4 h-4 mr-1" /> Crear mi primera solicitud
                            </Button>
                        </div>
                    ) : (
                        filteredLeaves.map((leave, index) => (
                            <div key={leave._id ?? index} className="grid grid-cols-2 sm:grid-cols-5 gap-2 px-3 py-3 items-center border-b last:border-b-0"
                                style={{ borderColor: isDark ? "rgba(6,182,212,0.08)" : "#f3f4f6" }}>
                                {/* Tipo */}
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate" style={{ color: isDark ? "#fff" : "#374151" }}>{leave.leavetype}</p>
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
                                        className="p-1.5 rounded-lg hover:bg-cyan-100 dark:hover:bg-[rgba(6,182,212,0.1)] transition-colors" title="Ver detalles">
                                        <Eye className="w-4 h-4" style={{ color: isDark ? "#06b6d4" : "#0891b2" }} />
                                    </button>
                                    {leave.status === "Pending" && (
                                        <button onClick={() => { setSelectedRequest(leave); setIsEditOpen(true) }}
                                            className="p-1.5 rounded-lg hover:bg-cyan-100 dark:hover:bg-[rgba(6,182,212,0.1)] transition-colors" title="Editar">
                                            <Edit className="w-4 h-4" style={{ color: isDark ? "#06b6d4" : "#0891b2" }} />
                                        </button>
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
                        <LeaveRequestForm onSubmit={handleCreate} onClose={() => setIsCreateOpen(false)} isLoading={HRLeavesState.isLoading} />
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
                        <LeaveRequestForm initialData={selectedRequest} onSubmit={handleEdit} onClose={() => { setIsEditOpen(false); setSelectedRequest(null) }} isLoading={HRLeavesState.isLoading} />
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
                    onEdit={(req) => { setIsDetailsOpen(false); setSelectedRequest(req); setIsEditOpen(true) }}
                    onDelete={handleDelete}
                    isLoading={HRLeavesState.isLoading}
                />
            )}
        </div>
    )
}