export const KeyDetailsBox = ({ image, dataname, data }) => {
    const labelMap = {
        employees: "Empleados",
        departments: "Departamentos",
        leaves: "Ausencias",
        requestes: "Solicitudes"
    }

    const colorMap = {
        employees: {
            accent: "#6366f1",
            bg: "rgba(99,102,241,0.08)",
            border: "rgba(99,102,241,0.2)",
            glow: "rgba(99,102,241,0.15)"
        },
        departments: {
            accent: "#8b5cf6",
            bg: "rgba(139,92,246,0.08)",
            border: "rgba(139,92,246,0.2)",
            glow: "rgba(139,92,246,0.15)"
        },
        leaves: {
            accent: "#06b6d4",
            bg: "rgba(6,182,212,0.08)",
            border: "rgba(6,182,212,0.2)",
            glow: "rgba(6,182,212,0.15)"
        },
        requestes: {
            accent: "#f59e0b",
            bg: "rgba(245,158,11,0.08)",
            border: "rgba(245,158,11,0.2)",
            glow: "rgba(245,158,11,0.15)"
        }
    }

    const colors = colorMap[dataname] || colorMap.employees
    const label = labelMap[dataname] || dataname

    return (
        <div
            className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(255,255,255,0.02) 100%)`,
                border: `1px solid ${colors.border}`,
                boxShadow: `0 4px 24px ${colors.glow}`
            }}
        >
            {/* Glow blob */}
            <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: colors.accent }}
            />

            <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p
                        className="text-3xl xl:text-4xl font-bold tracking-tight"
                        style={{ color: colors.accent }}
                    >
                        {data !== undefined && data !== "" ? data : "—"}
                    </p>
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">
                        {label}
                    </p>
                </div>

                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                >
                    <img
                        src={image}
                        alt={label}
                        className="w-6 h-6 object-contain"
                        style={{ filter: "brightness(0) saturate(100%) invert(1)" }}
                    />
                </div>
            </div>

            {/* Bottom accent line */}
            <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }}
            />
        </div>
    )
}
