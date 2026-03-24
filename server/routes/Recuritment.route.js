import express from 'express'
import { HandleCreateRecruitment, HandleAllRecruitments, HandleRecruitment, HandleUpdateRecruitment, HandleDeleteRecruitment } from '../controllers/Recruitment.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-recruitment", VerifyhHRToken, PermissionCheck("recruitment", "create"), HandleCreateRecruitment)
router.get("/all", VerifyhHRToken, PermissionCheck("recruitment", "read"), HandleAllRecruitments)
router.get("/:recruitmentID", VerifyhHRToken, PermissionCheck("recruitment", "read"), HandleRecruitment)
router.patch("/update-recruitment", VerifyhHRToken, PermissionCheck("recruitment", "update"), HandleUpdateRecruitment)
router.delete("/delete-recruitment/:recruitmentID", VerifyhHRToken, PermissionCheck("recruitment", "delete"), HandleDeleteRecruitment)

export default router
