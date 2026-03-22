import express from 'express'
import { HandleAllEvents, HandleCreateEvent, HandleDeleteEvent, HandleEvent, HandleUpdateEvent } from '../controllers/CorporateCalendar.controller.js'
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.post("/create-event", VerifyhHRToken, PermissionCheck("notices", "create"), HandleCreateEvent)
router.get("/all", VerifyhHRToken, PermissionCheck("notices", "read"), HandleAllEvents)
router.get("/:eventID", VerifyhHRToken, PermissionCheck("notices", "read"), HandleEvent)
router.patch("/update-event", VerifyhHRToken, PermissionCheck("notices", "update"), HandleUpdateEvent)
router.delete("/delete-event/:eventID", VerifyhHRToken, PermissionCheck("notices", "delete"), HandleDeleteEvent)

export default router
