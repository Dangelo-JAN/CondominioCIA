import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoutes.jsx"

function App() {
  return (
    <RouterProvider 
      router={router} 
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      }} 
    />
  )
}

export default App
