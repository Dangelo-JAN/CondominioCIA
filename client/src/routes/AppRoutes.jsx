import { createBrowserRouter } from "react-router-dom";
import { EmployeeRoutes } from "./employeeroutes.jsx"
import { HRRoutes } from "./HRroutes.jsx";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <EntryPage />,
        },
        // Unificamos las rutas en un solo árbol para que el Splat de React Router 
        // y el Rewrite de Vercel no choquen al buscar sub-rutas.
        ...EmployeeRoutes,
        ...HRRoutes,
        // Ruta de captura para evitar el 404 de React (diferente al de Vercel)
        {
            path: "*",
            element: <Navigate to="/" replace />,
        }
    ],
    {
        future: {
            v7_relativeSplatPath: true,
            v7_fetcherPersist: true,
            v7_normalizeFormMethod: true,
            v7_partialHydration: true,
            v7_skipActionStatusRevalidation: true,
            v7_startTransition: true,
            v7_skipActionErrorRevalidation: true,
        }
    }
)