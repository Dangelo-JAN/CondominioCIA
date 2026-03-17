import express from "express"
import { HandleAllEmployees, HandleEmployeeUpdate, HandleEmployeeDelete, HandleEmployeeByHR, HandleEmployeeByEmployee, HandleAllEmployeesIDS } from "../controllers/Employee.controller.js"
import { VerifyhHRToken, VerifyEmployeeToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.get("/all", VerifyhHRToken, PermissionCheck("employees", "read"), HandleAllEmployees)
router.get("/all-employees-ids", VerifyhHRToken, PermissionCheck("employees", "read"), HandleAllEmployeesIDS)
router.patch("/update-employee", VerifyEmployeeToken, HandleEmployeeUpdate)
router.delete("/delete-employee/:employeeId", VerifyhHRToken, PermissionCheck("employees", "delete"), HandleEmployeeDelete)
router.get("/by-HR/:employeeId", VerifyhHRToken, PermissionCheck("employees", "read"), HandleEmployeeByHR)
router.get("/by-employee", VerifyEmployeeToken, HandleEmployeeByEmployee)

export default router
