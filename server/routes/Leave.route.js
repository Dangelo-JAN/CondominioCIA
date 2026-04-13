import express from 'express'
import { 
    HandleAllLeaves, 
    HandleCreateLeave, 
    HandleDeleteLeave, 
    HandleLeave, 
    HandleUpdateLeaveByEmployee, 
    HandleUpdateLeavebyHR,
    HandleGetEmployeeLeaves,
    HandleCreateLeaveByHR,
    HandleDeleteLeaveByHR,
    HandleUpdateLeaveByHR
} from '../controllers/Leave.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// ============ RUTAS EMPLEADO ============
// Crear solicitud de ausencia (empleado)
router.post("/create-leave", VerifyEmployeeToken, HandleCreateLeave)
// Obtener solicitudes del empleado logueado
router.get("/employee-leaves", VerifyEmployeeToken, HandleGetEmployeeLeaves)
// Actualizar solicitud propia (solo si está Pending)
router.patch("/employee-update-leave", VerifyEmployeeToken, HandleUpdateLeaveByEmployee)
// Eliminar solicitud propia
router.delete("/delete-leave/:leaveID", VerifyEmployeeToken, HandleDeleteLeave)

// ============ RUTAS HR ============
// Obtener todas las solicitudes
router.get("/all", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleAllLeaves)
// Obtener solicitud por ID
router.get("/:leaveID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleLeave)
// Crear solicitud por empleado (HR crea/edita)
router.post("/hr-create-leave", VerifyhHRToken, PermissionCheck("leaves", "create"), HandleCreateLeaveByHR)
// Aprobar/Rechazar solicitud
router.patch("/HR-update-leave", VerifyhHRToken, PermissionCheck("leaves", "update"), HandleUpdateLeavebyHR)
// Actualizar solicitud por HR (edición completa)
router.patch("/hr-update-leave", VerifyhHRToken, PermissionCheck("leaves", "update"), HandleUpdateLeaveByHR)
// Eliminar solicitud por HR (soft-delete)
router.delete("/hr-delete-leave/:leaveID", VerifyhHRToken, PermissionCheck("leaves", "delete"), HandleDeleteLeaveByHR)

export default router