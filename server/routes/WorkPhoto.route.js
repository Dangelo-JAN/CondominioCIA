import express from 'express'
import {
    HandleUploadWorkPhoto,
    HandleGetMyWorkPhotos,
    HandleDeleteMyWorkPhoto,
    HandleGetAllWorkPhotos,
    HandleGetEmployeeWorkPhotos,
    HandleReviewWorkPhoto,
    HandleDeleteWorkPhoto
} from '../controllers/WorkPhoto.controller.js'
import { VerifyEmployeeToken, VerifyhHRToken } from '../middlewares/Auth.middleware.js'
import { RoleAuthorization } from '../middlewares/RoleAuth.middleware.js'

const router = express.Router()

// ── Rutas Employee ────────────────────────────────────────────────────────
router.post("/upload", VerifyEmployeeToken, HandleUploadWorkPhoto)
router.get("/my-photos", VerifyEmployeeToken, HandleGetMyWorkPhotos)
router.delete("/delete/:photoID", VerifyEmployeeToken, HandleDeleteMyWorkPhoto)

// ── Rutas HR ──────────────────────────────────────────────────────────────
router.get("/all", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetAllWorkPhotos)
router.get("/employee/:employeeID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleGetEmployeeWorkPhotos)
router.patch("/review", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleReviewWorkPhoto)
router.delete("/hr-delete/:photoID", VerifyhHRToken, RoleAuthorization("HR-Admin"), HandleDeleteWorkPhoto)

export default router
