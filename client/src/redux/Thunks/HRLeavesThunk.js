import { createAsyncThunk } from "@reduxjs/toolkit"
import { hrApiService } from "../apis/HRApiService"
import { HRLeavesEndPoints } from "../apis/APIsEndpoints"

export const HandleGetHRLeaves = createAsyncThunk('HandleGetHRLeaves', async (_, { rejectWithValue }) => {
    try {
        const response = await hrApiService.get(HRLeavesEndPoints.GETALL)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandleUpdateHRLeaveStatus = createAsyncThunk('HandleUpdateHRLeaveStatus', async (leaveData, { rejectWithValue }) => {
    try {
        const { leaveID, status, HRID } = leaveData
        const response = await hrApiService.patch(HRLeavesEndPoints.UPDATE_STATUS, {
            leaveID,
            status,
            HRID
        })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})