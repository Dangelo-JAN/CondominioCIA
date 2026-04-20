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
    reducers: {
        resetDashboardState: (state) => {
            state.isLoading = false
            state.attendance = null
            state.schedules = []
            state.photos = []
            state.fetchData = false
            state.error = { status: false, message: null, content: null }
        }
    },
    extraReducers: (builder) => {
        EmployeeDashboardAsyncReducer(builder, HandleEmployeeDashboard)
    }
})

export const { resetDashboardState } = EmployeeDashboardSlice.actions
export default EmployeeDashboardSlice.reducer
