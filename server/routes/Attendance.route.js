import express from 'express'
import {
    HandleInitializeAttendance, HandleAllAttendance, HandleAttendance,
    HandleUpdateAttendance, HandleDeleteAttendance,
    HandleCheckIn, HandleCheckOut, HandleGetMyAttendance
} from '../controllers/Attendance.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/initialize", VerifyEmployeeToken, HandleInitializeAttendance)
router.get("/all", VerifyhHRToken, PermissionCheck("attendance", "read"), HandleAllAttendance)
router.get("/:attendanceID", VerifyhHRToken, PermissionCheck("attendance", "read"), HandleAttendance)
router.patch("/update-attendance", VerifyEmployeeToken, HandleUpdateAttendance)
router.delete("/delete-attendance/:attendanceID", VerifyhHRToken, PermissionCheck("attendance", "delete"), HandleDeleteAttendance)
router.get("/my-attendance", VerifyEmployeeToken, HandleGetMyAttendance)
router.patch("/checkin", VerifyEmployeeToken, HandleCheckIn)
router.patch("/checkout", VerifyEmployeeToken, HandleCheckOut)

export default router
