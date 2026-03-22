import express from "express"
import { HandleCreateApplicant, HandleAllApplicants, HandleApplicant, HandleUpdateApplicant, HandleDeleteApplicant } from "../controllers/Applicant.controller.js"
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-applicant", VerifyhHRToken, PermissionCheck("notices", "create"), HandleCreateApplicant)
router.get("/all", VerifyhHRToken, PermissionCheck("notices", "read"), HandleAllApplicants)
router.get("/:applicantID", VerifyhHRToken, PermissionCheck("notices", "read"), HandleApplicant)
router.patch("/update-applicant", VerifyhHRToken, PermissionCheck("notices", "update"), HandleUpdateApplicant)
router.delete("/delete-applicant/:applicantID", VerifyhHRToken, PermissionCheck("notices", "delete"), HandleDeleteApplicant)

export default router
