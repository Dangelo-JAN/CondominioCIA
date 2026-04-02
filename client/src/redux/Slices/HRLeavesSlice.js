import { createSlice } from "@reduxjs/toolkit"
import { HRLeavesAsyncReducer } from "../AsyncReducers/asyncreducer.js"
import { 
    HandleGetEmployeeLeaves,
    HandleCreateEmployeeLeave,
    HandleUpdateEmployeeLeave,
    HandleDeleteEmployeeLeave,
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
        // Empleado
        HRLeavesAsyncReducer(builder, HandleGetEmployeeLeaves)
        HRLeavesAsyncReducer(builder, HandleCreateEmployeeLeave)
        HRLeavesAsyncReducer(builder, HandleUpdateEmployeeLeave)
        HRLeavesAsyncReducer(builder, HandleDeleteEmployeeLeave)
        
        // HR - Solicitudes
        HRLeavesAsyncReducer(builder, HandleGetHRLeaves)
        HRLeavesAsyncReducer(builder, HandleCreateLeaveByHR)
        HRLeavesAsyncReducer(builder, HandleUpdateLeaveByHR)
        HRLeavesAsyncReducer(builder, HandleDeleteLeaveByHR)
        HRLeavesAsyncReducer(builder, HandleUpdateHRLeaveStatus)
        
        // HR - Ausencias
        HRLeavesAsyncReducer(builder, HandleGetHRAbsences)
        HRLeavesAsyncReducer(builder, HandleDeleteHRAbsence)
    }
})

export default HRLeavesSlice.reducer