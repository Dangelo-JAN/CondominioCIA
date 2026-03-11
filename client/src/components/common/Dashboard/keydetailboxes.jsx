/*export const KeyDetailsBox = ({ image, dataname, data }) => {
    const labelMap = {
        employees: "Empleados",
        departments: "Departamentos",
        leaves: "Ausencias",
        requestes: "Solicitudes"
    }

    const colorMap = {
        employees: {
            accent: "#6366f1",
            bgLight: "rgba(99,102,241,0.06)",
            bgDark: "rgba(99,102,241,0.08)",
            borderLight: "rgba(99,102,241,0.15)",
            borderDark: "rgba(99,102,241,0.2)",
            glowLight: "rgba(99,102,241,0.08)",
            glowDark: "rgba(99,102,241,0.15)",
        },
        departments: {
            accent: "#8b5cf6",
            bgLight: "rgba(139,92,246,0.06)",
            bgDark: "rgba(139,92,246,0.08)",
            borderLight: "rgba(139,92,246,0.15)",
            borderDark: "rgba(139,92,246,0.2)",
            glowLight: "rgba(139,92,246,0.06)",
            glowDark: "rgba(139,92,246,0.15)",
        },
        leaves: {
            accent: "#06b6d4",
            bgLight: "rgba(6,182,212,0.06)",
            bgDark: "rgba(6,182,212,0.08)",
            borderLight: "rgba(6,182,212,0.15)",
            borderDark: "rgba(6,182,212,0.2)",
            glowLight: "rgba(6,182,212,0.06)",
            glowDark: "rgba(6,182,212,0.15)",
        },
        requestes: {
            accent: "#f59e0b",
            bgLight: "rgba(245,158,11,0.06)",
            bgDark: "rgba(245,158,11,0.08)",
            borderLight: "rgba(245,158,11,0.15)",
            borderDark: "rgba(245,158,11,0.2)",
            glowLight: "rgba(245,158,11,0.06)",
            glowDark: "rgba(245,158,11,0.15)",
        }
    }

    const colors = colorMap[dataname] || colorMap.employees
    const label = labelMap[dataname] || dataname

    const isDark = typeof document !== "undefined"
        && document.documentElement.classList.contains("dark")

    const bg = isDark ? colors.bgDark : colors.bgLight
    const border = isDark ? colors.borderDark : colors.borderLight
    const glow = isDark ? colors.glowDark : colors.glowLight
    const iconFilter = isDark
        ? "brightness(0) saturate(100%) invert(1)"
        : "brightness(0) saturate(100%) invert(35%) sepia(80%) hue-rotate(220deg)"

    return (
        <div
            className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${bg} 0%, transparent 100%)`,
                border: `1px solid ${border}`,
                boxShadow: `0 4px 24px ${glow}`
            }}
        >
            {/* Glow blob on hover *//*}
            <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: colors.accent }}
            />

            <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    {/* Number *//*}
                    <p className="text-3xl xl:text-4xl font-bold tracking-tight"
                        style={{ color: colors.accent }}>
                        {data !== undefined && data !== "" ? data : "—"}
                    </p>
                    {/* Label *//*}
                    <p className="text-sm font-medium uppercase tracking-widest
                        text-gray-400 dark:text-gray-500">
                        {label}
                    </p>
                </div>

                {/* Icon *//*}
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: bg, border: `1px solid ${border}` }}
                >
                    <img
                        src={image}
                        alt={label}
                        className="w-6 h-6 object-contain"
                        style={{ filter: iconFilter }}
                    />
                </div>
            </div>

            {/* Bottom accent line on hover *//*}
            <div
                className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: `linear-gradient(90deg, ${colors.accent}, transparent)` }}
            />
        </div>
    )
}*/

export const KeyDetailsBox = ({ image, dataname, data }) => {
    const labelMap = {
        employees: "Empleados",
        departments: "Departamentos",
        leaves: "Ausencias",
        requestes: "Solicitudes"
    }

    const colorMap = {
        employees:   { accent: "#6366f1", lightBg: "#eef2ff", lightBorder: "#c7d2fe", darkBg: "rgba(99,102,241,0.08)",  darkBorder: "rgba(99,102,241,0.2)",  glow: "rgba(99,102,241,0.12)",  iconBg: "#e0e7ff" },
        departments: { accent: "#8b5cf6", lightBg: "#f5f3ff", lightBorder: "#ddd6fe", darkBg: "rgba(139,92,246,0.08)", darkBorder: "rgba(139,92,246,0.2)", glow: "rgba(139,92,246,0.12)", iconBg: "#ede9fe" },
        leaves:      { accent: "#06b6d4", lightBg: "#ecfeff", lightBorder: "#a5f3fc", darkBg: "rgba(6,182,212,0.08)",  darkBorder: "rgba(6,182,212,0.2)",  glow: "rgba(6,182,212,0.12)",  iconBg: "#cffafe" },
        requestes:   { accent: "#f59e0b", lightBg: "#fffbeb", lightBorder: "#fde68a", darkBg: "rgba(245,158,11,0.08)", darkBorder: "rgba(245,158,11,0.2)", glow: "rgba(245,158,11,0.12)", iconBg: "#fef3c7" }
    }

    const colors = colorMap[dataname] || colorMap.employees
    const label = labelMap[dataname] || dataname

    // Detect dark mode
    const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")

    const cardBg = isDark
        ? `linear-gradient(135deg, ${colors.darkBg} 0%, rgba(255,255,255,0.01) 100%)`
        : `linear-gradient(135deg, ${colors.lightBg} 0%, #ffffff 100%)`

    const cardBorder = isDark ? colors.darkBorder : colors.lightBorder
    const iconBg     = isDark ? colors.darkBg      : colors.iconBg
    const iconBorder = isDark ? colors.darkBorder   : colors.lightBorder

    return (
        <div
            className="group relative rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden kdb-card"
            data-theme-card={dataname}
            style={{
                background: cardBg,
                border: `1px solid ${cardBorder}`,
                boxShadow: `0 4px 20px ${colors.glow}`
            }}
        >
            {/* Glow blob on hover */}
            <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: colors.accent }}
            />

            <div className="relative flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <p className="text-3xl xl:text-4xl font-bold tracking-tight"
                        style={{ color: colors.accent }}>
                        {data !== undefined && data !== "" ? data : "—"}
                    </p>
                    <p className="text-xs font-semibold uppercase tracking-widest
                        text-gray-400 dark:text-[rgba(255,255,255,0.4)]">
                        {label}
                    </p>
                </div>

                <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: iconBg, border: `1px solid ${iconBorder}` }}
                >
                    <img
                        src={image}
                        alt={label}
                        className="w-6 h-6 object-contain"
                        style={{
                            filter: isDark
                                ? "brightness(0) saturate(100%) invert(1)"
                                : `brightness(0) saturate(100%) invert(30%) sepia(80%) saturate(500%) hue-rotate(220deg)`
                        }}
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
