import { Absence } from "../models/Absence.model.js"
import { Employee } from "../models/Employee.model.js"

// Obtener todas las ausencias (HR)
export const HandleGetAllAbsences = async (req, res) => {
    try {
        const absences = await Absence.find({ 
            organizationID: req.ORGID,
            isDeleted: false 
        }).populate("employee createdBy", "firstname lastname department")

        return res.status(200).json({ success: true, message: "All absence records retrieved successfully", data: absences })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Obtener ausencia por ID
export const HandleGetAbsence = async (req, res) => {
    try {
        const { absenceID } = req.params
        const absence = await Absence.findOne({ _id: absenceID, organizationID: req.ORGID, isDeleted: false })
            .populate("employee createdBy", "firstname lastname department")

        if (!absence) {
            return res.status(404).json({ success: false, message: "Absence record not found" })
        }

        return res.status(200).json({ success: true, message: "Absence record retrieved successfully", data: absence })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Obtener ausencias de un empleado específico
export const HandleGetEmployeeAbsences = async (req, res) => {
    try {
        const { employeeID } = req.params
        const absences = await Absence.find({ 
            employee: employeeID,
            organizationID: req.ORGID,
            isDeleted: false 
        }).populate("createdBy", "firstname lastname")

        return res.status(200).json({ success: true, message: "Employee absences retrieved successfully", data: absences })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Eliminar ausencia (HR - soft-delete)
export const HandleDeleteAbsence = async (req, res) => {
    try {
        const { absenceID } = req.params

        const absence = await Absence.findOne({ _id: absenceID, organizationID: req.ORGID, isDeleted: false })

        if (!absence) {
            return res.status(404).json({ success: false, message: "Ausencia no encontrada" })
        }

        // Soft-delete
        absence.isDeleted = true
        absence.deletedAt = new Date()
        await absence.save()

        return res.status(200).json({ success: true, message: "Ausencia eliminada exitosamente" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}