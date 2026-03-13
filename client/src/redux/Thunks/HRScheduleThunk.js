import { createAsyncThunk } from "@reduxjs/toolkit"
import { apiService } from "../apis/apiService"

const ScheduleEndPoints = {
    CREATE:           "/api/v1/schedule/create",
    GET_ALL:          "/api/v1/schedule/all",
    GET_EMPLOYEE:     (employeeID) => `/api/v1/schedule/employee/${employeeID}`,
    UPDATE:           "/api/v1/schedule/update",
    DELETE:           (scheduleID) => `/api/v1/schedule/delete/${scheduleID}`,
}

export const HandleHRSchedule = createAsyncThunk(
    "HRSchedule/action",
    async (payload, { rejectWithValue }) => {
        try {
            const { type, data } = payload

            if (type === "GetAll") {
                const res = await apiService.get(ScheduleEndPoints.GET_ALL, { withCredentials: true })
                return { ...res.data, type: "GetAll" }
            }

            if (type === "GetEmployee") {
                const res = await apiService.get(ScheduleEndPoints.GET_EMPLOYEE(data.employeeID), { withCredentials: true })
                return { ...res.data, type: "GetEmployee" }
            }

            if (type === "Create") {
                const { employee, ...rest } = data
                const payload = { ...rest, employeeID: employee }
                const res = await apiService.post(ScheduleEndPoints.CREATE, payload, { withCredentials: true })
                return { ...res.data, type: "Create" }
            }

            if (type === "Update") {
                const res = await apiService.patch(ScheduleEndPoints.UPDATE, data, { withCredentials: true })
                return { ...res.data, type: "Update" }
            }

            if (type === "Delete") {
                const res = await apiService.delete(ScheduleEndPoints.DELETE(data.scheduleID), { withCredentials: true })
                return { ...res.data, type: "Delete", scheduleID: data.scheduleID }
            }

        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error desconocido" })
        }
    }
)
