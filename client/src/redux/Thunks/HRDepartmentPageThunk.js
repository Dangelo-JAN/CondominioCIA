import { createAsyncThunk } from "@reduxjs/toolkit"
import { hrApiService } from "../apis/HRApiService"
import { HRDepartmentPageEndPoints } from "../apis/APIsEndpoints"

export const HandleGetHRDepartments = createAsyncThunk('HandleGetHRDepartments', async (HRDepartmentPageData, { rejectWithValue }) => {
    try {
        const { apiroute } = HRDepartmentPageData
        const response = await hrApiService.get(`${HRDepartmentPageEndPoints[apiroute]}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandlePostHRDepartments = createAsyncThunk('HandlePostHRDepartments', async (HRDepartmentPageData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = HRDepartmentPageData
        const response = await hrApiService.post(`${HRDepartmentPageEndPoints[apiroute]}`, data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandlePatchHRDepartments = createAsyncThunk('HandlePatchHRDepartments', async (HRDepartmentPageData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = HRDepartmentPageData
        const response = await hrApiService.patch(`${HRDepartmentPageEndPoints[apiroute]}`, data)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandleDeleteHRDepartments = createAsyncThunk("HandleDeleteHRDepartments", async (HRDepartmentPageData, { rejectWithValue }) => {
    try {
        const { apiroute, data } = HRDepartmentPageData
        const response = await hrApiService.delete(`${HRDepartmentPageEndPoints[apiroute]}`, { data })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
