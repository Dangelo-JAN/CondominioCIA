import express from 'express'
import { HandleAllInterviews, HandleCreateInterview, HandleInterview, HandleUpdateInterview, HandleDeleteInterview } from '../controllers/InterviewInsights.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-interview", VerifyhHRToken, PermissionCheck("interviews", "create"), HandleCreateInterview)
router.get("/all", VerifyhHRToken, PermissionCheck("interviews", "read"), HandleAllInterviews)
router.get("/:interviewID", VerifyhHRToken, PermissionCheck("interviews", "read"), HandleInterview)
router.patch("/update-interview", VerifyhHRToken, PermissionCheck("interviews", "update"), HandleUpdateInterview)
router.delete("/delete-interview/:interviewID", VerifyhHRToken, PermissionCheck("interviews", "delete"), HandleDeleteInterview)

export default router
