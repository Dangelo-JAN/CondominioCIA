import { Employee } from "../models/Employee.model.js"
import { Department } from "../models/Department.model.js"
import { Leave } from "../models/Leave.model.js"
import { Salary } from "../models/Salary.model.js"
import { Notice } from "../models/Notice.model.js"
import { GenerateRequest } from "../models/GenerateRequest.model.js"
import { Balance } from "../models/Balance.model.js"

export const HandleHRDashboard = async (req, res) => {
    try {
        const [employees, departments, leaves, requestes, balance, notices] = await Promise.all([
            Employee.countDocuments({ organizationID: req.ORGID }),
            Department.countDocuments({ organizationID: req.ORGID }),
            Leave.countDocuments({ organizationID: req.ORGID }),
            GenerateRequest.countDocuments({ organizationID: req.ORGID }),
            Balance.find({ organizationID: req.ORGID }).sort({ createdAt: 1 }),
            Notice.find({ organizationID: req.ORGID }).sort({ createdAt: -1 }).limit(10).populate("createdby", "firstname lastname")
        ]);

        // Si el balance está vacío, enviamos un array con un objeto inicial en 0 para evitar el crash del frontend
        const safeBalance = balance.length > 0 ? balance : [{ AvailableAmount: 0, TotalAmount: 0, SpentAmount: 0 }];

        return res.status(200).json({ 
            success: true, 
            data: { 
                employees, 
                departments, 
                leaves, 
                requestes, 
                balance: safeBalance, 
                notices 
            } 
        });
    } catch (error) {
        console.error("Dashboard Error:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}
