import express from 'express'
import {
    HandleCreateSchedule,
    HandleGetAllSchedules,
    HandleGetEmployeeSchedules,
    HandleUpdateSchedule,
    HandleDeleteSchedule,
    HandleGetMySchedules,
    HandleCompleteTask,
    HandleDuplicateSchedule,
    HandleCloseSchedule,
    HandleCloseExpiredSchedules,
    HandleRegisterDailyAbsences
} from '../controllers/Schedule.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// ── Rutas HR ──────────────────────────────────────────────────────────────
router.post("/create", VerifyhHRToken, PermissionCheck("schedules", "create"), HandleCreateSchedule)
router.get("/all", VerifyhHRToken, PermissionCheck("schedules", "read"), HandleGetAllSchedules)
router.get("/employee/:employeeID", VerifyhHRToken, PermissionCheck("schedules", "read"), HandleGetEmployeeSchedules)
router.patch("/update", VerifyhHRToken, PermissionCheck("schedules", "update"), HandleUpdateSchedule)
router.delete("/delete/:scheduleID", VerifyhHRToken, PermissionCheck("schedules", "delete"), HandleDeleteSchedule)
router.post("/duplicate/:scheduleID", VerifyhHRToken, PermissionCheck("schedules", "create"), HandleDuplicateSchedule)
router.patch("/close/:scheduleID", VerifyhHRToken, PermissionCheck("schedules", "update"), HandleCloseSchedule)

// ── Rutas Employee ────────────────────────────────────────────────────────
router.get("/my-schedules", VerifyEmployeeToken, HandleGetMySchedules)
router.patch("/complete-task", VerifyEmployeeToken, HandleCompleteTask)

// ── Rutas CRON (Webhook externo) ────────────────────────────────────────────
router.get("/cron/close-expired", HandleCloseExpiredSchedules)
router.get("/cron/register-absences", HandleRegisterDailyAbsences)

export default router
