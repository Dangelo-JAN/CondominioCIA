import { createSlice } from "@reduxjs/toolkit"
import { HRLeavesAsyncReducer } from "../AsyncReducers/asyncreducer.js"
import { 
    HandleGetEmployeeLeaves,
    HandleCreateEmployeeLeave,
    HandleUpdateEmployeeLeave,
    HandleDeleteEmployeeLeave,
    HandleGetEmployeeAbsences,
    HandleGetHRLeaves,
    HandleCreateLeaveByHR,
    HandleUpdateLeaveByHR,
    HandleDeleteLeaveByHR,
    HandleUpdateHRLeaveStatus,
    HandleGetHRAbsences,
    HandleDeleteHRAbsence
} from "../Thunks/HRLeavesThunk.js"

const HRLeavesSlice = createSlice({
    name: "HRLeaves",
    initialState: {
        data: null,            // Para solicitudes
        absencesData: null,    // Para ausencias aprobadas
        isLoading: false,
        success: {
            status: false,
            message: null,
            content: null
        },
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        // Empleado - Solicitudes
        HRLeavesAsyncReducer(builder, HandleGetEmployeeLeaves, "HandleGetEmployeeLeaves")
        HRLeavesAsyncReducer(builder, HandleCreateEmployeeLeave, "HandleCreateEmployeeLeave")
        HRLeavesAsyncReducer(builder, HandleUpdateEmployeeLeave, "HandleUpdateEmployeeLeave")
        HRLeavesAsyncReducer(builder, HandleDeleteEmployeeLeave, "HandleDeleteEmployeeLeave")
        
        // Empleado - Ausencias
        HRLeavesAsyncReducer(builder, HandleGetEmployeeAbsences, "HandleGetEmployeeAbsences")
        
        // HR - Solicitudes
        HRLeavesAsyncReducer(builder, HandleGetHRLeaves, "HandleGetHRLeaves")
        HRLeavesAsyncReducer(builder, HandleCreateLeaveByHR, "HandleCreateLeaveByHR")
        HRLeavesAsyncReducer(builder, HandleUpdateLeaveByHR, "HandleUpdateLeaveByHR")
        HRLeavesAsyncReducer(builder, HandleDeleteLeaveByHR, "HandleDeleteLeaveByHR")
        HRLeavesAsyncReducer(builder, HandleUpdateHRLeaveStatus, "HandleUpdateHRLeaveStatus")
        
        // HR - Ausencias
        HRLeavesAsyncReducer(builder, HandleGetHRAbsences, "HandleGetHRAbsences")
        HRLeavesAsyncReducer(builder, HandleDeleteHRAbsence, "HandleDeleteHRAbsence")
    }
})

export default HRLeavesSlice.reducer