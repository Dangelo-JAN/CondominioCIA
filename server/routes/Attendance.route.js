import express from 'express'
import {
    HandleInitializeAttendance,
    HandleAllAttendance,
    HandleAttendance,
    HandleUpdateAttendance,
    HandleDeleteAttendance,
    HandleCheckIn,
    HandleCheckOut,
    HandleGetMyAttendance
} from '../controllers/Attendance.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// ── Rutas existentes (sin cambios) ──────────────────────────────────────────
router.post("/initialize", VerifyEmployeeToken, HandleInitializeAttendance)
router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAllAttendance)
router.get("/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleAttendance)
router.patch("/update-attendance", VerifyEmployeeToken, HandleUpdateAttendance)
router.delete("/delete-attendance/:attendanceID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteAttendance)

// ── Rutas nuevas ─────────────────────────────────────────────────────────────
router.get("/my-attendance", VerifyEmployeeToken, HandleGetMyAttendance)
router.patch("/checkin", VerifyEmployeeToken, HandleCheckIn)
router.patch("/checkout", VerifyEmployeeToken, HandleCheckOut)

export default router
