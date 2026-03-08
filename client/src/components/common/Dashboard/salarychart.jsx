import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-xl p-3 text-xs"
                style={{
                    background: "rgba(13,13,24,0.95)",
                    border: "1px solid rgba(99,102,241,0.25)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)"
                }}
            >
                <p className="font-semibold text-white mb-2 uppercase tracking-wider text-[10px]">{label}</p>
                {payload.map((entry, i) => (
                    <div key={i} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ background: entry.color }} />
                        <span style={{ color: "rgba(255,255,255,0.6)" }}>{entry.name}:</span>
                        <span className="font-semibold text-white">
                            ${entry.value?.toLocaleString() ?? 0}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

export const SalaryChart = ({ balancedata }) => {
    const chartData = []

    if (balancedata) {
        for (let index = 0; index < balancedata.balance.length; index++) {
            chartData.push({
                month: balancedata.balance[index]["expensemonth"],
                SalriesPaid: balancedata.balance[index]["totalexpenses"],
                AvailableAmount: balancedata.balance[index]["availableamount"]
            })
        }
    }

    let trendingUp = 0
    if (balancedata && chartData.length >= 2) {
        const last = chartData[chartData.length - 1]["AvailableAmount"]
        const prev = chartData[chartData.length - 2]["AvailableAmount"]
        if (prev !== 0) {
            trendingUp = Math.round(((last - prev) * 100) / prev)
        }
    }

    const availableAmount = chartData.length > 0
        ? chartData[chartData.length - 1]["AvailableAmount"]
        : 0

    const TrendIcon = trendingUp > 0 ? TrendingUp : trendingUp < 0 ? TrendingDown : Minus
    const trendColor = trendingUp > 0 ? "#00e676" : trendingUp < 0 ? "#ff1744" : "#6366f1"

    const dateRange = chartData.length > 0
        ? `${chartData[0]["month"]} — ${chartData[chartData.length - 1]["month"]} 2024`
        : null

    return (
        <div className="flex flex-col h-full p-5 gap-4">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] mb-1"
                        style={{ color: "rgba(99,102,241,0.8)" }}
                    >
                        Balance Salarial
                    </p>
                    <h2 className="text-white font-bold text-lg leading-tight">
                        Gráfico de Nóminas
                    </h2>
                    {dateRange && (
                        <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                            {dateRange}
                        </p>
                    )}
                </div>

                {/* Available amount pill */}
                <div className="flex flex-col items-end gap-1">
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                        Disponible
                    </p>
                    <p className="text-lg font-bold" style={{ color: "#6366f1" }}>
                        ${availableAmount.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{
                            background: `${trendColor}15`,
                            border: `1px solid ${trendColor}30`
                        }}
                    >
                        <TrendIcon className="w-3 h-3" style={{ color: trendColor }} />
                        <span className="text-[10px] font-semibold" style={{ color: trendColor }}>
                            {trendingUp > 0 ? "+" : ""}{trendingUp}%
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-[180px]">
                {chartData.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-sm" style={{ color: "rgba(255,255,255,0.2)" }}>
                            Sin datos de balance aún
                        </p>
                    </div>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                            <defs>
                                <linearGradient id="gradSalaries" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="gradAvailable" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="rgba(255,255,255,0.04)"
                                vertical={false}
                            />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }}
                                tickFormatter={(v) => v.slice(0, 3)}
                            />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(99,102,241,0.2)", strokeWidth: 1 }} />
                            <Area
                                dataKey="SalriesPaid"
                                name="Nóminas pagadas"
                                type="monotone"
                                fill="url(#gradSalaries)"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                            />
                            <Area
                                dataKey="AvailableAmount"
                                name="Monto disponible"
                                type="monotone"
                                fill="url(#gradAvailable)"
                                stroke="#6366f1"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 pt-1">
                {[
                    { color: "#8b5cf6", label: "Nóminas pagadas" },
                    { color: "#6366f1", label: "Monto disponible" }
                ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className="w-6 h-0.5 rounded-full" style={{ background: item.color }} />
                        <span className="text-[11px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}
