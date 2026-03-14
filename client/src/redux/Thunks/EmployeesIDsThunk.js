import { createAsyncThunk } from "@reduxjs/toolkit"
import { hrApiService } from "../apis/HRApiService"
import { EmployeesIDsEndPoints } from "../apis/APIsEndpoints"

export const fetchEmployeesIDs = createAsyncThunk("fetchEmployeesIDs", async (fetchdata, { rejectWithValue }) => {
    try {
        const { apiroute } = fetchdata
        const response = await hrApiService.get(`${EmployeesIDsEndPoints[apiroute]}`)
        return response.data
    } catch (error) {
        return rejectWithValue(error.response.data)
    }
})
