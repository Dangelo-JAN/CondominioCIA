import { Schedule } from "../models/Schedule.model.js"
import { Employee } from "../models/Employee.model.js"
import { HumanResources } from "../models/HR.model.js"

// ── HR: Crear horario y asignarlo a un empleado ───────────────────────────
export const HandleCreateSchedule = async (req, res) => {
    try {
        const { employeeID, title, description, startdate, enddate, schedule } = req.body

        if (!employeeID || !title || !startdate || !enddate || !schedule) {
            return res.status(400).json({ success: false, message: "Todos los campos son requeridos" })
        }

        const employee = await Employee.findOne({ _id: employeeID, organizationID: req.ORGID })

        if (!employee) {
            return res.status(404).json({ success: false, message: "Empleado no encontrado" })
        }

        const newSchedule = await Schedule.create({
            employee: employeeID,
            title,
            description: description || null,
            startdate,
            enddate,
            schedule,
            createdby: req.HRid,
            organizationID: req.ORGID
        })

        return res.status(201).json({
            success: true,
            message: "Horario creado y asignado exitosamente",
            data: newSchedule
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Obtener todos los horarios de la organización ─────────────────────
export const HandleGetAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find({ organizationID: req.ORGID })
            .populate("employee", "firstname lastname department")
            .populate("createdby", "firstname lastname")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: "Horarios obtenidos exitosamente",
            data: schedules
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Obtener horarios de un empleado específico ────────────────────────
export const HandleGetEmployeeSchedules = async (req, res) => {
    try {
        const { employeeID } = req.params

        if (!employeeID) {
            return res.status(400).json({ success: false, message: "employeeID es requerido" })
        }

        const schedules = await Schedule.find({
            employee: employeeID,
            organizationID: req.ORGID
        })
            .populate("employee", "firstname lastname department")
            .populate("createdby", "firstname lastname")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            message: "Horarios del empleado obtenidos exitosamente",
            data: schedules
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Actualizar un horario ─────────────────────────────────────────────
export const HandleUpdateSchedule = async (req, res) => {
    try {
        const { scheduleID, title, description, startdate, enddate, schedule, isactive } = req.body

        if (!scheduleID) {
            return res.status(400).json({ success: false, message: "scheduleID es requerido" })
        }

        const existingSchedule = await Schedule.findOne({
            _id: scheduleID,
            organizationID: req.ORGID
        })

        if (!existingSchedule) {
            return res.status(404).json({ success: false, message: "Horario no encontrado" })
        }

        if (title !== undefined) existingSchedule.title = title
        if (description !== undefined) existingSchedule.description = description
        if (startdate !== undefined) existingSchedule.startdate = startdate
        if (enddate !== undefined) existingSchedule.enddate = enddate
        if (schedule !== undefined) existingSchedule.schedule = schedule
        if (isactive !== undefined) existingSchedule.isactive = isactive

        await existingSchedule.save()

        return res.status(200).json({
            success: true,
            message: "Horario actualizado exitosamente",
            data: existingSchedule
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── HR: Eliminar un horario ───────────────────────────────────────────────
export const HandleDeleteSchedule = async (req, res) => {
    try {
        const { scheduleID } = req.params

        if (!scheduleID) {
            return res.status(400).json({ success: false, message: "scheduleID es requerido" })
        }

        const schedule = await Schedule.findOne({
            _id: scheduleID,
            organizationID: req.ORGID
        })

        if (!schedule) {
            return res.status(404).json({ success: false, message: "Horario no encontrado" })
        }

        await schedule.deleteOne()

        return res.status(200).json({
            success: true,
            message: "Horario eliminado exitosamente"
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── Employee: Obtener mis horarios activos ────────────────────────────────
export const HandleGetMySchedules = async (req, res) => {
    try {

        console.log("EMid:", req.EMPID)
        console.log("ORGID:", req.ORGID)
        const schedules = await Schedule.find({
            employee: req.EMPID,
            organizationID: req.ORGID,
            isactive: true
        })
            .populate("createdby", "firstname lastname")
            .sort({ startdate: 1 })

        return res.status(200).json({
            success: true,
            message: "Horarios obtenidos exitosamente",
            data: schedules
        })

    } catch (error) {
        console.log("ERROR DETALLADO:", error.message)
        console.log("ERROR STACK:", error.stack)
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}

// ── Employee: Marcar tarea como completada ────────────────────────────────
export const HandleCompleteTask = async (req, res) => {
    try {
        const { scheduleID, dayID, taskID } = req.body

        if (!scheduleID || !dayID || !taskID) {
            return res.status(400).json({ success: false, message: "Todos los campos son requeridos" })
        }

        const schedule = await Schedule.findOne({
            _id: scheduleID,
            employee: req.EMPID,
            organizationID: req.ORGID
        })

        if (!schedule) {
            return res.status(404).json({ success: false, message: "Horario no encontrado" })
        }

        const day = schedule.schedule.id(dayID)
        if (!day) {
            return res.status(404).json({ success: false, message: "Día no encontrado" })
        }

        const task = day.tasks.id(taskID)
        if (!task) {
            return res.status(404).json({ success: false, message: "Tarea no encontrada" })
        }

        task.completed = !task.completed
        await schedule.save()

        return res.status(200).json({
            success: true,
            message: `Tarea marcada como ${task.completed ? "completada" : "pendiente"}`,
            data: schedule
        })

    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error })
    }
}
