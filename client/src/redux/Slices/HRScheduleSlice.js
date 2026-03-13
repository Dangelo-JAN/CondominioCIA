import { createSlice } from "@reduxjs/toolkit"
import { HRScheduleAsyncReducer } from "../AsyncReducers/asyncreducer.js"
import { HandleHRSchedule } from "../Thunks/HRScheduleThunk.js"

const HRScheduleSlice = createSlice({
    name: "HRSchedule",
    initialState: {
        data: null,
        employeeSchedules: null,
        isLoading: false,
        fetchData: false,
        success: {
            status: false,
            message: null,
        },
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        HRScheduleAsyncReducer(builder, HandleHRSchedule)
    }
})

export default HRScheduleSlice.reducer
