import express from 'express'
import {
    HandleCreateSchedule,
    HandleGetAllSchedules,
    HandleGetEmployeeSchedules,
    HandleUpdateSchedule,
    HandleDeleteSchedule,
    HandleGetMySchedules,
    HandleCompleteTask
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

// ── Rutas Employee ────────────────────────────────────────────────────────
router.get("/my-schedules", VerifyEmployeeToken, HandleGetMySchedules)
router.patch("/complete-task", VerifyEmployeeToken, HandleCompleteTask)

export default router
