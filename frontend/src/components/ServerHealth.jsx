export default function ServerHealth({ cpu = 0, memory = 0, disk = 0, network = 0 }) {
    const getHealthColor = (value) => {
        if (value < 50) return 'bg-green-500'
        if (value < 80) return 'bg-yellow-500'
        return 'bg-red-500'
    }

    const metrics = [
        { label: 'CPU', value: cpu, unit: '%' },
        { label: 'Memory', value: memory, unit: '%' },
        { label: 'Disk', value: disk, unit: '%' },
    ]

    return (
        <div className="space-y-6">
            {metrics.map((metric, index) => (
                <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-gray-700">{metric.label}</span>
                        <span className="text-sm font-bold text-gray-900">
                            {metric.value.toFixed(1)}{metric.unit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div
                            className={`h-full ${getHealthColor(metric.value)} transition-all duration-500 rounded-full`}
                            style={{ width: `${Math.min(metric.value, 100)}%` }}
                        >
                            <div className="h-full w-full animate-pulse opacity-75"></div>
                        </div>
                    </div>
                </div>
            ))}

            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-blue-700">🌐 Network Traffic</span>
                    <span className="text-2xl font-bold text-blue-900">{network.toFixed(0)} Mbps</span>
                </div>
            </div>
        </div>
    )
}
