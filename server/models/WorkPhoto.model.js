import mongoose from 'mongoose'
import { Schema } from "mongoose"

const WorkPhotoSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    // URL de la imagen (Cloudinary, S3, etc.)
    photourl: {
        type: String,
        required: true
    },
    // ID público para poder eliminarla del servicio de almacenamiento
    publicid: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    // Fecha de la jornada a la que corresponde la foto
    workdate: {
        type: Date,
        required: true
    },
    // HR puede marcar la foto como vista
    reviewedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HR",
        default: null
    },
    reviewedat: {
        type: Date,
        default: null
    },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true
    }
}, { timestamps: true })

export const WorkPhoto = mongoose.model("WorkPhoto", WorkPhotoSchema)
