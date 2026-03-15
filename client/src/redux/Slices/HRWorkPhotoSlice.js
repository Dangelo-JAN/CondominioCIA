import { createSlice } from "@reduxjs/toolkit"
import { HRWorkPhotoAsyncReducer } from "../AsyncReducers/asyncreducer.js"
import { HandleHRWorkPhoto } from "../Thunks/HRWorkPhotoThunk.js"

const HRWorkPhotoSlice = createSlice({
    name: "HRWorkPhoto",
    initialState: {
        photos: [],
        isLoading: false,
        error: {
            status: false,
            message: null,
            content: null
        }
    },
    extraReducers: (builder) => {
        HRWorkPhotoAsyncReducer(builder, HandleHRWorkPhoto)
    }
})

export default HRWorkPhotoSlice.reducer
