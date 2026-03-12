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
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// ── Rutas HR ──────────────────────────────────────────────────────────────
router.post("/create", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleCreateSchedule)
router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetAllSchedules)
router.get("/employee/:employeeID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetEmployeeSchedules)
router.patch("/update", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleUpdateSchedule)
router.delete("/delete/:scheduleID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteSchedule)

// ── Rutas Employee ────────────────────────────────────────────────────────
router.get("/my-schedules", VerifyEmployeeToken, HandleGetMySchedules)
router.patch("/complete-task", VerifyEmployeeToken, HandleCompleteTask)

export default router
