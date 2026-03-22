import express from "express"
import { HandleCreateBalance, HandleAllBalances, HandleBalance, HandleUpdateBalance, HandleDeleteBalance } from "../controllers/Balance.controller.js"
import { VerifyhHRToken } from "../middlewares/Auth.middleware.js"
import { PermissionCheck } from "../middlewares/RoleAuth.middleware.js"

const router = express.Router()

router.post("/add-balance", VerifyhHRToken, PermissionCheck("salaries", "create"), HandleCreateBalance)
router.get("/all", VerifyhHRToken, PermissionCheck("salaries", "read"), HandleAllBalances)
router.get("/:balanceID", VerifyhHRToken, PermissionCheck("salaries", "read"), HandleBalance)
router.patch("/update-balance", VerifyhHRToken, PermissionCheck("salaries", "update"), HandleUpdateBalance)
router.delete("/delete-balance/:balanceID", VerifyhHRToken, PermissionCheck("salaries", "delete"), HandleDeleteBalance)

export default router
