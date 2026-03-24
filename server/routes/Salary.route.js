import express from 'express'
import { HandleCreateSalary, HandleAllSalary, HandleSalary, HandleUpdateSalary, HandleDeleteSalary } from '../controllers/Salary.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

router.post("/create-salary", VerifyhHRToken, PermissionCheck("salaries", "create"), HandleCreateSalary)
router.get("/all", VerifyhHRToken, PermissionCheck("salaries", "read"), HandleAllSalary)
router.get("/:salaryID", VerifyhHRToken, PermissionCheck("salaries", "read"), HandleSalary)
router.patch("/update-salary", VerifyhHRToken, PermissionCheck("salaries", "update"), HandleUpdateSalary)
router.delete("/delete-salary/:salaryID", VerifyhHRToken, PermissionCheck("salaries", "delete"), HandleDeleteSalary)

export default router
