import express from "express"
import { HandleCreateNotice, HandleAllNotice, HandleNotice, HandleUpdateNotice, HandleDeleteNotice } from "../controllers/Notice.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.post("/create-notice", VerifyhHRToken, PermissionCheck("notices", "create"), HandleCreateNotice)
router.get("/all/", VerifyhHRToken, PermissionCheck("notices", "read"), HandleAllNotice)
router.get("/:noticeID", VerifyhHRToken, PermissionCheck("notices", "read"), HandleNotice)
router.patch("/update-notice", VerifyhHRToken, PermissionCheck("notices", "update"), HandleUpdateNotice)
router.delete("/delete-notice/:noticeID", VerifyhHRToken, PermissionCheck("notices", "delete"), HandleDeleteNotice)

export default router
