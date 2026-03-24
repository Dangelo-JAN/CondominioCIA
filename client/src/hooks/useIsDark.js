import { useState, useEffect } from "react"

/**
 * Hook reactivo para detectar el tema oscuro.
 * Observa cambios en el classList del <html> en tiempo real,
 * por lo que re-renderiza el componente cuando el usuario cambia el tema.
 */
export const useIsDark = () => {
    const [isDark, setIsDark] = useState(
        () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    )

    useEffect(() => {
        const observer = new MutationObserver(() => {
            setIsDark(document.documentElement.classList.contains("dark"))
        })

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        })

        return () => observer.disconnect()
    }, [])

    return isDark
}
