import express from 'express'
import { HandleGetAllAbsences, HandleGetAbsence, HandleGetEmployeeAbsences, HandleDeleteAbsence } from '../controllers/Absence.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// Obtener todas las ausencias (HR)
router.get("/all", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetAllAbsences)

// Obtener ausencia por ID
router.get("/:absenceID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetAbsence)

// Obtener ausencias de un empleado específico
router.get("/employee/:employeeID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetEmployeeAbsences)

// Eliminar ausencia (HR - soft-delete)
router.delete("/delete/:absenceID", VerifyhHRToken, PermissionCheck("leaves", "delete"), HandleDeleteAbsence)

export default router