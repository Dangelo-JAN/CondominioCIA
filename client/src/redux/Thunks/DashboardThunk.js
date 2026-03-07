import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../apis/apiService";
import { DashboardEndPoints } from "../apis/APIsEndpoints";

export const HandleGetDashboard = createAsyncThunk("HandleGetDashboard", async (DashboardData, { rejectWithValue }) => {
    try {
        const { apiroute } = DashboardData;
        const endpoint = DashboardEndPoints[apiroute];
        
        // Verificación de seguridad antes de la petición
        if (!endpoint) throw new Error("Ruta de API no definida");

        const response = await apiService.get(endpoint, { 
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        // Esto ayudará a ver el 404 exacto en la consola si persiste
        console.error("Dashboard Thunk Error:", error.response || error);
        return rejectWithValue(error.response?.data || "Error de conexión"); 
    }
})
