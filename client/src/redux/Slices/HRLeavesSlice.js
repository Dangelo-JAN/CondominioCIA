import { createSlice } from "@reduxjs/toolkit"
import { HRLeavesAsyncReducer } from "../AsyncReducers/asyncreducer.js"
import { HandleGetHRLeaves, HandleUpdateHRLeaveStatus } from "../Thunks/HRLeavesThunk.js"

const HRLeavesSlice = createSlice({
    name: "HRLeaves",
    initialState: {
        data: null,
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
        HRLeavesAsyncReducer(builder, HandleGetHRLeaves)
        HRLeavesAsyncReducer(builder, HandleUpdateHRLeaveStatus)
    }
})

export default HRLeavesSlice.reducer