import express from 'express'
import {
    HandleEmplyoeeSignup, HandleEmplyoeeVerifyEmail, HandleEmplyoeeLogout,
    HandleEmplyoeeLogin, HandleEmplyoeeForgotPassword, HandleEmplyoeeSetPassword,
    HandleResetEmplyoeeVerifyEmail, HandleEmployeeCheck, HandleEmployeeCheckVerifyEmail
} from '../controllers/EmplyoeeAuth.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { PermissionCheck } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// Crear empleado requiere permiso de create en employees
router.post("/signup", VerifyhHRToken, PermissionCheck("employees", "create"), HandleEmplyoeeSignup)
router.post("/verify-email", VerifyEmployeeToken, HandleEmplyoeeVerifyEmail)
router.post("/resend-verify-email", VerifyEmployeeToken, HandleResetEmplyoeeVerifyEmail)
router.post("/login", HandleEmplyoeeLogin)
router.get("/check-login", VerifyEmployeeToken, HandleEmployeeCheck)
router.post("/logout", HandleEmplyoeeLogout)
router.post("/forgot-password", VerifyEmployeeToken, HandleEmplyoeeForgotPassword)
router.post("/reset-password/:token", HandleEmplyoeeSetPassword)
router.get("/check-verify-email", VerifyEmployeeToken, HandleEmployeeCheckVerifyEmail)

export default router
