import { WorkPhoto } from "../models/WorkPhoto.model.js"
import { Employee } from "../models/Employee.model.js"
import { v2 as cloudinary } from "cloudinary"

// Configurar Cloudinary (requiere CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET en .env)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// ── Employee: Subir foto de trabajo ──────────────────────────────────────
export const HandleUploadWorkPhoto = async (req, res) => {
    try {
        const { photo, description, workdate } = req.body

        if (!photo || !workdate) {
            return res.status(400).json({ success: false, message: "La foto y la fecha son requeridas" })
        }

        const employee = await Employee.findOne({ _id: req.EMid, organizationID: req.ORGID })

        if (!employee) {
            return res.status(404).json({ success: false, message: "Empleado no encontrado" })
        }

        // Subir imagen a Cloudinary
        const uploadResult = await cloudinary.uploader.upload(photo, {
            folder: `ems/${req.ORGID}/workphotos/${req.EMid}`,
            resource_type: "image",
            transformation: [
                { quality: "auto", fetch_format: "auto" },
                { width: 1200, crop: "limit" }
            ]
        })

        const newPhoto = await WorkPhoto.create({
            employee: req.EMid,
            photourl: uploadResult.secure_url,
            publicid: uploadResult.public_id,
            description: description || null,
            workdate: new Date(workdate),
            organizationID: req.ORGID
        })

        return res.status(201).json({
            success: true,
            message: "Foto subida exitosamente",
            data: newPhoto
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── Employee: Obtener mis fotos ───────────────────────────────────────────
export const HandleGetMyWorkPhotos = async (req, res) => {
    try {
        const photos = await WorkPhoto.find({
            employee: req.EMid,
            organizationID: req.ORGID
        }).sort({ workdate: -1 })

        return res.status(200).json({
            success: true,
            message: "Fotos obtenidas exitosamente",
            data: photos
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── Employee: Eliminar una foto propia ────────────────────────────────────
export const HandleDeleteMyWorkPhoto = async (req, res) => {
    try {
        const { photoID } = req.params

        const photo = await WorkPhoto.findOne({
            _id: photoID,
            employee: req.EMid,
            organizationID: req.ORGID
        })

        if (!photo) {
            return res.status(404).json({ success: false, message: "Foto no encontrada" })
        }

        // Eliminar de Cloudinary
        await cloudinary.uploader.destroy(photo.publicid)

        await photo.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Foto eliminada exitosamente"
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Ver todas las fotos de la organización ────────────────────────────
export const HandleGetAllWorkPhotos = async (req, res) => {
    try {
        const photos = await WorkPhoto.find({ organizationID: req.ORGID })
            .populate("employee", "firstname lastname department")
            .populate("reviewedby", "firstname lastname")
            .sort({ workdate: -1 })

        return res.status(200).json({
            success: true,
            message: "Fotos obtenidas exitosamente",
            data: photos
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Ver fotos de un empleado específico ───────────────────────────────
export const HandleGetEmployeeWorkPhotos = async (req, res) => {
    try {
        const { employeeID } = req.params

        const photos = await WorkPhoto.find({
            employee: employeeID,
            organizationID: req.ORGID
        })
            .populate("employee", "firstname lastname department")
            .sort({ workdate: -1 })

        return res.status(200).json({
            success: true,
            message: "Fotos del empleado obtenidas exitosamente",
            data: photos
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Marcar foto como revisada ─────────────────────────────────────────
export const HandleReviewWorkPhoto = async (req, res) => {
    try {
        const { photoID } = req.body

        if (!photoID) {
            return res.status(400).json({ success: false, message: "photoID es requerido" })
        }

        const photo = await WorkPhoto.findOne({
            _id: photoID,
            organizationID: req.ORGID
        })

        if (!photo) {
            return res.status(404).json({ success: false, message: "Foto no encontrada" })
        }

        photo.reviewedby = req.HRid
        photo.reviewedat = new Date()

        await photo.save()

        return res.status(200).json({
            success: true,
            message: "Foto marcada como revisada",
            data: photo
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Eliminar foto de cualquier empleado ───────────────────────────────
export const HandleDeleteWorkPhoto = async (req, res) => {
    try {
        const { photoID } = req.params

        const photo = await WorkPhoto.findOne({
            _id: photoID,
            organizationID: req.ORGID
        })

        if (!photo) {
            return res.status(404).json({ success: false, message: "Foto no encontrada" })
        }

        await cloudinary.uploader.destroy(photo.publicid)
        await photo.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Foto eliminada exitosamente"
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}
