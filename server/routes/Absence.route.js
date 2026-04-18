import express from 'express'
import { HandleGetAllAbsences, HandleGetAbsence, HandleGetEmployeeAbsences, HandleDeleteAbsence } from '../controllers/Absence.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// Obtener mis ausencias aprobadas (EMPLEADO - debe estar ANTES de /:absenceID)
router.get("/my-absences", VerifyEmployeeToken, HandleGetEmployeeAbsences)

// Obtener todas las ausencias (HR)
router.get("/all", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetAllAbsences)

// Obtener ausencias de un empleado específico (HR)
router.get("/employee/:employeeID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetEmployeeAbsences)

// Obtener ausencia por ID (debe estar al final)
router.get("/:absenceID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleGetAbsence)

// Eliminar ausencia (HR - soft-delete)
router.delete("/delete/:absenceID", VerifyhHRToken, PermissionCheck("leaves", "delete"), HandleDeleteAbsence)

export default router