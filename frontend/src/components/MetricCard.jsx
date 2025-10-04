export default function MetricCard({ title, value, subtitle, trend, trendUp, bgColor }) {
    return (
        <div className={`${bgColor} text-white rounded-xl shadow-lg p-6 transform transition-all hover:scale-105`}>
            <h3 className="text-sm font-semibold opacity-90 mb-2">{title}</h3>
            <p className="text-4xl font-bold mb-2">{value}</p>
            <div className="flex items-center justify-between">
                <p className="text-xs opacity-75">{subtitle}</p>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${trendUp ? 'bg-white/20' : 'bg-black/20'
                    }`}>
                    {trendUp ? '↑' : '↓'} {trend}
                </span>
            </div>
        </div>
    )
}
