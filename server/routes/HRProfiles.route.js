import express from "express"
import {
    HandleInviteHR,
    HandleAcceptInvitation,
    HandleGetAllHRProfiles,
    HandleUpdateHRPermissions,
    HandleUpdateHRRole,
    HandleToggleHRActive,
    HandleDeleteHRProfile
} from "../controllers/HRProfiles.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { AdminOnly } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

// ── Pública — aceptar invitación ──────────────────────────────────────────
router.post("/accept-invitation/:token", HandleAcceptInvitation)

// ── HR-Admin only ─────────────────────────────────────────────────────────
router.post("/invite",                  VerifyhHRToken, AdminOnly, HandleInviteHR)
router.get("/all",                      VerifyhHRToken, AdminOnly, HandleGetAllHRProfiles)
router.patch("/update-permissions",     VerifyhHRToken, AdminOnly, HandleUpdateHRPermissions)
router.patch("/update-role",            VerifyhHRToken, AdminOnly, HandleUpdateHRRole)
router.patch("/toggle-active",          VerifyhHRToken, AdminOnly, HandleToggleHRActive)
router.delete("/delete/:hrID",          VerifyhHRToken, AdminOnly, HandleDeleteHRProfile)

export default router
