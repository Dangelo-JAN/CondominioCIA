import express from "express"
import { HandleHRDashboard } from "../controllers/Dashboard.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

// Dashboard requiere poder leer al menos empleados
router.get("/HR-dashboard", VerifyhHRToken, PermissionCheck("employees", "read"), HandleHRDashboard)

export default router
