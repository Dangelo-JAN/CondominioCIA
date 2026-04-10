import { createAsyncThunk } from "@reduxjs/toolkit"
import { hrApiService } from "../apis/HRApiService"
import { HRLeavesEndPoints, HRAbsencesEndPoints } from "../apis/APIsEndpoints"

// ============ EMPLEADO ============

// Obtener mis solicitudes de ausencia
export const HandleGetEmployeeLeaves = createAsyncThunk(
    'HandleGetEmployeeLeaves',
    async (_, { rejectWithValue }) => {
        try {
            const response = await hrApiService.get(HRLeavesEndPoints.GET_EMPLOYEE_LEAVES)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Crear solicitud de ausencia (empleado)
export const HandleCreateEmployeeLeave = createAsyncThunk(
    'HandleCreateEmployeeLeave',
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await hrApiService.post(HRLeavesEndPoints.CREATE_LEAVE, leaveData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Actualizar solicitud propia (solo pending)
export const HandleUpdateEmployeeLeave = createAsyncThunk(
    'HandleUpdateEmployeeLeave',
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await hrApiService.patch(HRLeavesEndPoints.UPDATE_EMPLOYEE_LEAVE, leaveData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Eliminar solicitud propia (solo pending)
export const HandleDeleteEmployeeLeave = createAsyncThunk(
    'HandleDeleteEmployeeLeave',
    async (leaveID, { rejectWithValue }) => {
        try {
            const response = await hrApiService.delete(HRLeavesEndPoints.DELETE_EMPLOYEE_LEAVE(leaveID))
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// ============ HR - SOLICITUDES ============

// Obtener todas las solicitudes (HR)
export const HandleGetHRLeaves = createAsyncThunk(
    'HandleGetHRLeaves',
    async (_, { rejectWithValue }) => {
        try {
            const response = await hrApiService.get(HRLeavesEndPoints.GETALL)
            console.log("[DEBUG] HandleGetHRLeaves - response:", response)
            console.log("[DEBUG] HandleGetHRLeaves - response.data:", response.data)
            return response.data
        } catch (error) {
            console.log("[DEBUG] HandleGetHRLeaves - error:", error)
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Crear solicitud por empleado (HR)
export const HandleCreateLeaveByHR = createAsyncThunk(
    'HandleCreateLeaveByHR',
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await hrApiService.post(HRLeavesEndPoints.CREATE_BY_HR, leaveData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Actualizar solicitud (HR - solo pending)
export const HandleUpdateLeaveByHR = createAsyncThunk(
    'HandleUpdateLeaveByHR',
    async (leaveData, { rejectWithValue }) => {
        try {
            const response = await hrApiService.patch(HRLeavesEndPoints.UPDATE_BY_HR, leaveData)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Eliminar solicitud (HR - soft-delete)
export const HandleDeleteLeaveByHR = createAsyncThunk(
    'HandleDeleteLeaveByHR',
    async (leaveID, { rejectWithValue }) => {
        try {
            const response = await hrApiService.delete(HRLeavesEndPoints.DELETE_BY_HR(leaveID))
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Aprobar/Rechazar solicitud (HR)
export const HandleUpdateHRLeaveStatus = createAsyncThunk(
    'HandleUpdateHRLeaveStatus',
    async (leaveData, { rejectWithValue }) => {
        try {
            const { leaveID, status } = leaveData
            const response = await hrApiService.patch(HRLeavesEndPoints.UPDATE_STATUS, {
                leaveID,
                status
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// ============ HR - AUSENCIAS ============

// Obtener todas las ausencias
export const HandleGetHRAbsences = createAsyncThunk(
    'HandleGetHRAbsences',
    async (_, { rejectWithValue }) => {
        try {
            const response = await hrApiService.get(HRAbsencesEndPoints.GETALL)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)

// Eliminar ausencia
export const HandleDeleteHRAbsence = createAsyncThunk(
    'HandleDeleteHRAbsence',
    async (absenceID, { rejectWithValue }) => {
        try {
            const response = await hrApiService.delete(HRAbsencesEndPoints.DELETE(absenceID))
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message)
        }
    }
)