import { createSlice } from "@reduxjs/toolkit"
import { EmployeeDashboardAsyncReducer } from "../AsyncReducers/asyncreducer"
import { HandleEmployeeDashboard } from "../Thunks/EmployeeDashboardThunk"

const EmployeeDashboardSlice = createSlice({
    name: "employeedashboard",
    initialState: {
        isLoading: false,
        attendance: null,
        schedules: [],
        photos: [],
        fetchData: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        EmployeeDashboardAsyncReducer(builder, HandleEmployeeDashboard)
    }
})

export default EmployeeDashboardSlice.reducer
