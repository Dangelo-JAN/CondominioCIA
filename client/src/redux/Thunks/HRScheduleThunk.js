import { createAsyncThunk } from "@reduxjs/toolkit"
import { hrApiService } from "../apis/HRApiService"

const ScheduleEndPoints = {
    CREATE:       "/api/v1/schedule/create",
    GET_ALL:      "/api/v1/schedule/all",
    GET_EMPLOYEE: (employeeID) => `/api/v1/schedule/employee/${employeeID}`,
    UPDATE:       "/api/v1/schedule/update",
    DELETE:       (scheduleID) => `/api/v1/schedule/delete/${scheduleID}`,
    DUPLICATE:    (scheduleID) => `/api/v1/schedule/duplicate/${scheduleID}`,
}

export const HandleHRSchedule = createAsyncThunk(
    "HRSchedule/action",
    async (payload, { rejectWithValue }) => {
        try {
            const { type, data } = payload

            if (type === "GetAll") {
                const res = await hrApiService.get(ScheduleEndPoints.GET_ALL)
                return { ...res.data, type: "GetAll" }
            }

            if (type === "GetEmployee") {
                const res = await hrApiService.get(ScheduleEndPoints.GET_EMPLOYEE(data.employeeID))
                return { ...res.data, type: "GetEmployee" }
            }

            if (type === "Create") {
                const { employee, ...rest } = data
                const body = { ...rest, employeeID: employee }
                const res = await hrApiService.post(ScheduleEndPoints.CREATE, body)
                return { ...res.data, type: "Create" }
            }

            if (type === "Update") {
                const res = await hrApiService.patch(ScheduleEndPoints.UPDATE, data)
                return { ...res.data, type: "Update" }
            }

            if (type === "Delete") {
                const res = await hrApiService.delete(ScheduleEndPoints.DELETE(data.scheduleID))
                return { ...res.data, type: "Delete", scheduleID: data.scheduleID }
            }

            if (type === "Duplicate") {
                const res = await hrApiService.post(ScheduleEndPoints.DUPLICATE(data.scheduleID), {
                    title: data.title,
                    startdate: data.startdate,
                    enddate: data.enddate
                })
                return { ...res.data, type: "Duplicate" }
            }

        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Error desconocido" })
        }
    }
)
