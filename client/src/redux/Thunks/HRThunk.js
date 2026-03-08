import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { HREndPoints } from "../apis/APIsEndpoints";

export const HandleGetHumanResources = createAsyncThunk("HandleGetHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute } = HRData;
        const response = await apiService.get(`${HREndPoints[apiroute]}`, {
            withCredentials: true
        });
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data);
    }
})


export const HandlePostHumanResources = createAsyncThunk("HandlePostHumanResources", async (HRData, { rejectWithValue }) => {
    try {
        const { apiroute, data, type } = HRData
        if (type == "resetpassword") {
            const response = await apiService.post(`${HREndPoints.RESET_PASSWORD(apiroute)}`, data, { 
                withCredentials: true
            })
            return response.data
        }
        else {
            const response = await apiService.post(`${HREndPoints[apiroute]}`, data, {
                withCredentials: true
            })
            return response.data 
        }
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
})
// ✅ Thunk de logout: llama al backend, limpia cookie, resetea Redux y redirige
export const HandleHRLogout = () => async (dispatch) => {
    try {
        await apiService.post(HREndPoints["LOGOUT"], {}, { withCredentials: true })
    } catch (error) {
        // Aunque falle el backend, limpiamos el estado igual
        console.error("Logout error:", error)
    } finally {
        dispatch(logoutHR())
    }
}

export const HandlePutHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })

export const HandlePatchHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })

export const HandleDeleteHumanResources = createAsyncThunk("HandlePutHumanResources", async (HRData, { rejectWithValue }) => { })