import express from "express"
import { HandleCreateDepartment, HandleAllDepartments, HandleDepartment, HandleUpdateDepartment, HandleDeleteDepartment } from "../controllers/Department.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.post("/create-department", VerifyhHRToken, PermissionCheck("departments", "create"), HandleCreateDepartment)
router.get("/all", VerifyhHRToken, PermissionCheck("departments", "read"), HandleAllDepartments)
router.get("/:departmentID", VerifyhHRToken, PermissionCheck("departments", "read"), HandleDepartment)
router.patch("/update-department", VerifyhHRToken, PermissionCheck("departments", "update"), HandleUpdateDepartment)
router.delete("/delete-department", VerifyhHRToken, PermissionCheck("departments", "delete"), HandleDeleteDepartment)

export default router
