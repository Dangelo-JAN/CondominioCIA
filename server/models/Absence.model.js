import mongoose from 'mongoose'
import { Schema } from "mongoose";

const AbsenceSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Employee"
    },
    leaveRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Leave",
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    leavetype: {
        type: String,
        required: true,
        enum: ["Vacaciones", "Reposo Médico", "Personal", "Otro"]
    },
    title: {
        type: String,
        required: true,
        default: "Ausencia"
    },
    reason: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "HumanResources"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    },
    organizationID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization"
    }
}, { timestamps: true });

export const Absence = mongoose.model("Absence", AbsenceSchema)