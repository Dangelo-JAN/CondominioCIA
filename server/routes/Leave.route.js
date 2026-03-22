import express from 'express'
import { HandleAllLeaves, HandleCreateLeave, HandleDeleteLeave, HandleLeave, HandleUpdateLeaveByEmployee, HandleUpdateLeavebyHR } from '../controllers/Leave.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-leave", VerifyEmployeeToken, HandleCreateLeave)
router.get("/all", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleAllLeaves)
router.get("/:leaveID", VerifyhHRToken, PermissionCheck("leaves", "read"), HandleLeave)
router.patch("/employee-update-leave", VerifyEmployeeToken, HandleUpdateLeaveByEmployee)
router.patch("/HR-update-leave", VerifyhHRToken, PermissionCheck("leaves", "update"), HandleUpdateLeavebyHR)
router.delete("/delete-leave/:leaveID", VerifyEmployeeToken, HandleDeleteLeave)

export default router
