import express from 'express'
import {
    HandleHRSignup,
    HandleHRVerifyEmail,
    HandleHRResetverifyEmail,
    HandleHRLogin,
    HandleHRCheck,
    HandleHRLogout,
    HandleHRForgotPassword,
    HandleHRResetPassword,
    HandleHRcheckVerifyEmail
} from '../controllers/HRAuth.controller.js'
import { VerifyhHRToken } from '../middlewares/Auth.middleware.js'

const router = express.Router()

// ── Públicas — sin token ──────────────────────────────────────────────────
router.post("/signup", HandleHRSignup)
router.post("/login", HandleHRLogin)
router.post("/reset-password/:token", HandleHRResetPassword)

// ── Protegidas — cualquier rol HR autenticado ─────────────────────────────
router.get("/check-login", VerifyhHRToken, HandleHRCheck)
router.get("/check-verify-email", VerifyhHRToken, HandleHRcheckVerifyEmail)
router.post("/verify-email", VerifyhHRToken, HandleHRVerifyEmail)
router.post("/resend-verify-email", VerifyhHRToken, HandleHRResetverifyEmail)
router.post("/logout", HandleHRLogout)
router.post("/forgot-password", VerifyhHRToken, HandleHRForgotPassword)

export default router
