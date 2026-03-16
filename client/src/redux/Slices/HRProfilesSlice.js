import { createSlice } from "@reduxjs/toolkit"
import { HandleHRProfiles } from "../Thunks/HRProfilesThunk.js"

const HRProfilesSlice = createSlice({
    name: "HRProfiles",
    initialState: {
        data: [],
        isLoading: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(HandleHRProfiles.pending, (state) => {
            state.isLoading = true
            state.error.content = null
        })
        builder.addCase(HandleHRProfiles.fulfilled, (state, action) => {
            state.isLoading = false
            state.error.status = false
            state.error.message = null
            state.error.content = null

            if (action.payload.type === "GetAll") {
                state.data = action.payload.data
            }
            else if (action.payload.type === "Invite") {
                state.data = [action.payload.data, ...state.data]
            }
            else if (action.payload.type === "UpdatePermissions" || action.payload.type === "UpdateRole" || action.payload.type === "ToggleActive") {
                state.data = state.data.map(hr =>
                    hr._id === action.payload.data._id ? action.payload.data : hr
                )
            }
            else if (action.payload.type === "Delete") {
                state.data = state.data.filter(hr => hr._id !== action.payload.hrID)
            }
        })
        builder.addCase(HandleHRProfiles.rejected, (state, action) => {
            state.isLoading = false
            state.error.status = true
            state.error.message = action.payload?.message
            state.error.content = action.payload
        })
    }
})

export default HRProfilesSlice.reducer
