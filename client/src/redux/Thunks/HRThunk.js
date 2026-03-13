import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/apiService"
import { HREndPoints } from "../apis/APIsEndpoints"
import { logoutHR } from "../Slices/HRSlice"

export const HandleGetHumanResources = createAsyncThunk("HandleGetHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute } = HRData
        const response = await apiService.get(`${HREndPoints[apiroute]}`, { withCredentials: true })
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandlePostHumanResources = createAsyncThunk("HandlePostHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute, data, type } = HRData

        if (type === "resetpassword") {
            const response = await apiService.post(`${HREndPoints.RESET_PASSWORD(apiroute)}`, data, { withCredentials: true })
            return response.data
        }

        const response = await apiService.post(`${HREndPoints[apiroute]}`, data, { withCredentials: true })

        // Guardar token al hacer login o signup
        if ((apiroute === "LOGIN" || apiroute === "SIGNUP") && response.data?.token) {
            localStorage.setItem("HRtoken", response.data.token)
        }

        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})

export const HandleHRLogout = createAsyncThunk("HandleHRLogout", async (_, { dispatch, rejectWithValue }) => {
    try {
        const response = await apiService.post(HREndPoints["LOGOUT"], {}, { withCredentials: true })
        localStorage.removeItem("HRtoken")
        dispatch(logoutHR())
        return response.data
    } catch (error) {
        localStorage.removeItem("HRtoken")
        dispatch(logoutHR())
        return rejectWithValue(error?.response?.data)
    }
})

export const HandlePutHumanResources    = createAsyncThunk("HandlePutHumanResources",    async (HRData, { rejectWithValue }) => { })
export const HandlePatchHumanResources  = createAsyncThunk("HandlePatchHumanResources",  async (HRData, { rejectWithValue }) => { })
export const HandleDeleteHumanResources = createAsyncThunk("HandleDeleteHumanResources", async (HRData, { rejectWithValue }) => { })
