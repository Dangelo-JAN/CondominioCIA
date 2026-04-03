import { Employee } from "../models/Employee.model.js"
import { HumanResources } from "../models/HR.model.js"
import { Leave } from "../models/Leave.model.js"
import { Absence } from "../models/Absence.model.js"


// ============ FUNCIONES AUXILIARES ============
const getEmployeeFromToken = async (req) => {
    return await Employee.findOne({ _id: req.EMPID, organizationID: req.ORGID })
}

const checkLeaveExists = async (employeeID, startdate, enddate, excludeLeaveID = null) => {
    const query = {
        employee: employeeID,
        startdate: new Date(startdate),
        enddate: new Date(enddate),
        isDeleted: false
    }
    if (excludeLeaveID) {
        query._id = { $ne: excludeLeaveID }
    }
    return await Leave.findOne(query)
}

const createAbsenceFromLeave = async (leave, HRID) => {
    return await Absence.create({
        employee: leave.employee,
        leaveRequest: leave._id,
        startdate: leave.startdate,
        enddate: leave.enddate,
        leavetype: leave.leavetype,
        title: leave.title,
        reason: leave.reason,
        createdBy: HRID,
        organizationID: leave.organizationID
    })
}


// ============ RUTAS EMPLEADO ============

// Crear solicitud de ausencia (empleado)
export const HandleCreateLeave = async (req, res) => {
    try {
        const { startdate, enddate, leavetype, title, reason } = req.body

        if (!startdate || !enddate || !leavetype || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const employee = await getEmployeeFromToken(req)
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        const checkleave = await checkLeaveExists(employee._id, startdate, enddate)
        if (checkleave) {
            return res.status(400).json({ success: false, message: "Ya existe una solicitud para estas fechas" })
        }

        const leave = await Leave.create({
            employee: employee._id,
            leavetype,
            startdate: new Date(startdate),
            enddate: new Date(enddate),
            title,
            reason,
            organizationID: req.ORGID
        })

        employee.leaverequest.push(leave._id)
        await employee.save()

        return res.status(200).json({ success: true, message: "Solicitud creada exitosamente", data: leave })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Obtener solicitudes del empleado logueado
export const HandleGetEmployeeLeaves = async (req, res) => {
    try {
        const employee = await getEmployeeFromToken(req)
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        const leaves = await Leave.find({ 
            employee: employee._id,
            isDeleted: false 
        }).populate("approvedby", "firstname lastname")

        // Headers anti-caché para evitar 304
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.set('Pragma', 'no-cache')
        res.set('Expires', '0')

        return res.status(200).json({ success: true, message: "Solicitudes recuperadas exitosamente", data: leaves })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Actualizar solicitud propia (solo si está Pending)
export const HandleUpdateLeaveByEmployee = async (req, res) => {
    try {
        const { leaveID, startdate, enddate, leavetype, title, reason } = req.body

        if (!leaveID || !startdate || !enddate || !leavetype || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const leave = await Leave.findOne({ _id: leaveID, employee: req.EMPID, isDeleted: false })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Solicitud no encontrada" })
        }

        // Solo permite edición si está Pending
        if (leave.status !== "Pending") {
            return res.status(400).json({ success: false, message: "Solo puedes editar solicitudes pendientes" })
        }

        // Verificar que no exista otra solicitud en esas fechas
        const checkleave = await checkLeaveExists(leave.employee, startdate, enddate, leaveID)
        if (checkleave) {
            return res.status(400).json({ success: false, message: "Ya existe una solicitud para estas fechas" })
        }

        leave.leavetype = leavetype
        leave.startdate = new Date(startdate)
        leave.enddate = new Date(enddate)
        leave.title = title
        leave.reason = reason

        await leave.save()

        return res.status(200).json({ success: true, message: "Solicitud actualizada exitosamente", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Eliminar solicitud propia
export const HandleDeleteLeave = async (req, res) => {
    try {
        const { leaveID } = req.params

        const leave = await Leave.findOne({ _id: leaveID, employee: req.EMPID, isDeleted: false })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Solicitud no encontrada" })
        }

        // Solo permite eliminar si está Pending
        if (leave.status !== "Pending") {
            return res.status(400).json({ success: false, message: "Solo puedes eliminar solicitudes pendientes" })
        }

        // Soft-delete
        leave.isDeleted = true
        leave.deletedAt = new Date()
        await leave.save()

        return res.status(200).json({ success: true, message: "Solicitud eliminada exitosamente" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


// ============ RUTAS HR ============

// Obtener todas las solicitudes
export const HandleAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({ 
            organizationID: req.ORGID,
            isDeleted: false 
        }).populate("employee approvedby", "firstname lastname department")

        // Headers anti-caché para evitar 304
        res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
        res.set('Pragma', 'no-cache')
        res.set('Expires', '0')
        
        return res.status(200).json({ success: true, message: "All leave records retrieved successfully", data: leaves })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Obtener solicitud por ID
export const HandleLeave = async (req, res) => {
    try {
        const { leaveID } = req.params
        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID, isDeleted: false })
            .populate("employee approvedby", "firstname lastname department")

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        return res.status(200).json({ success: true, message: "Leave record retrieved successfully", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}

// Crear solicitud por empleado (HR crea/edita)
export const HandleCreateLeaveByHR = async (req, res) => {
    try {
        const { employeeID, startdate, enddate, leavetype, title, reason } = req.body

        if (!employeeID || !startdate || !enddate || !leavetype || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const employee = await Employee.findOne({ _id: employeeID, organizationID: req.ORGID })

        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" })
        }

        const checkleave = await checkLeaveExists(employeeID, startdate, enddate)
        if (checkleave) {
            return res.status(400).json({ success: false, message: "Ya existe una solicitud para estas fechas" })
        }

        const leave = await Leave.create({
            employee: employeeID,
            leavetype,
            startdate: new Date(startdate),
            enddate: new Date(enddate),
            title,
            reason,
            organizationID: req.ORGID
        })

        employee.leaverequest.push(leave._id)
        await employee.save()

        return res.status(200).json({ success: true, message: "Solicitud creada exitosamente", data: leave })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Actualizar solicitud por HR (edición)
export const HandleUpdateLeaveByHR = async (req, res) => {
    try {
        const { leaveID, startdate, enddate, leavetype, title, reason } = req.body

        if (!leaveID || !startdate || !enddate || !leavetype || !title || !reason) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID, isDeleted: false })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Solicitud no encontrada" })
        }

        // Solo permite edición si está Pending
        if (leave.status !== "Pending") {
            return res.status(400).json({ success: false, message: "Solo puedes editar solicitudes pendientes" })
        }

        // Verificar que no exista otra solicitud en esas fechas
        const checkleave = await checkLeaveExists(leave.employee, startdate, enddate, leaveID)
        if (checkleave) {
            return res.status(400).json({ success: false, message: "Ya existe una solicitud para estas fechas" })
        }

        leave.leavetype = leavetype
        leave.startdate = new Date(startdate)
        leave.enddate = new Date(enddate)
        leave.title = title
        leave.reason = reason

        await leave.save()

        return res.status(200).json({ success: true, message: "Solicitud actualizada exitosamente", data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Eliminar solicitud por HR (soft-delete)
export const HandleDeleteLeaveByHR = async (req, res) => {
    try {
        const { leaveID } = req.params

        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID, isDeleted: false })

        if (!leave) {
            return res.status(404).json({ success: false, message: "Solicitud no encontrada" })
        }

        // Soft-delete
        leave.isDeleted = true
        leave.deletedAt = new Date()
        await leave.save()

        return res.status(200).json({ success: true, message: "Solicitud eliminada exitosamente" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

// Aprobar/Rechazar solicitud (HR) - CREA AUSENCIA AL APROBAR
export const HandleUpdateLeavebyHR = async (req, res) => {
    try {
        const { leaveID, status, HRID } = req.body

        if (!leaveID || !status || !HRID) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        const leave = await Leave.findOne({ _id: leaveID, organizationID: req.ORGID, isDeleted: false })
        const HR = await HumanResources.findById(HRID)

        if (!leave) {
            return res.status(404).json({ success: false, message: "Leave record not found" })
        }

        if (!HR) {
            return res.status(404).json({ success: false, message: "HR not found" })
        }

        leave.status = status
        leave.approvedby = HRID
        await leave.save()

        // Si se aprueba, crear ausencia automáticamente
        if (status === "Approved") {
            await createAbsenceFromLeave(leave, HRID)
        }

        return res.status(200).json({ success: true, message: `Solicitud ${status === "Approved" ? "aprobada" : "rechazada"} exitosamente`, data: leave })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}