import express from 'express'
import {
    HandleAllGenerateRequest, HandleCreateGenerateRequest, HandleDeleteRequest,
    HandleGenerateRequest, HandleUpdateRequestByEmployee, HandleUpdateRequestByHR
} from '../controllers/GenerateRequest.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-request", VerifyEmployeeToken, HandleCreateGenerateRequest)
router.get("/all", VerifyhHRToken, PermissionCheck("requests", "read"), HandleAllGenerateRequest)
router.get("/:requestID", VerifyhHRToken, PermissionCheck("requests", "read"), HandleGenerateRequest)
router.patch("/update-request-content", VerifyEmployeeToken, HandleUpdateRequestByEmployee)
router.patch("/update-request-status", VerifyhHRToken, PermissionCheck("requests", "update"), HandleUpdateRequestByHR)
router.delete("/delete-request/:requestID", VerifyhHRToken, PermissionCheck("requests", "delete"), HandleDeleteRequest)

export default router
