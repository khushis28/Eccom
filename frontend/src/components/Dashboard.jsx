import MetricCard from './MetricCard'
import SalesChart from './SalesChart'
import TrafficChart from './TrafficChart'
import ServerHealth from './ServerHealth'
import ActiveUsersChart from './ActiveUsersChart'

export default function Dashboard({ metrics }) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <MetricCard
                    title="💰 Total Revenue"
                    value={`$${metrics.revenue?.toLocaleString() || 0}`}
                    subtitle="Last 24 hours"
                    trend="+12.5%"
                    trendUp={true}
                    bgColor="bg-gradient-to-br from-green-500 to-emerald-600"
                />
                <MetricCard
                    title="📦 Total Orders"
                    value={metrics.orders || 0}
                    subtitle="Today's orders"
                    trend="+8.2%"
                    trendUp={true}
                    bgColor="bg-gradient-to-br from-blue-500 to-blue-600"
                />
                <MetricCard
                    title="👥 Active Users"
                    value={metrics.activeUsers || 0}
                    subtitle="Currently online"
                    trend="+15.3%"
                    trendUp={true}
                    bgColor="bg-gradient-to-br from-purple-500 to-purple-600"
                />
                <MetricCard
                    title="📈 Conversion Rate"
                    value={`${metrics.conversionRate || 0}%`}
                    subtitle="This week"
                    trend="-2.1%"
                    trendUp={false}
                    bgColor="bg-gradient-to-br from-orange-500 to-orange-600"
                />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Sales Performance</h2>
                    <SalesChart />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">👥 Active Users</h2>
                    <ActiveUsersChart activeUsers={metrics.activeUsers} sessions={metrics.sessions} />
                </div>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">🌐 Traffic Sources</h2>
                    <TrafficChart trafficSources={metrics.trafficSources} />
                </div>
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">🖥️ Server Health</h2>
                    <ServerHealth
                        cpu={metrics.cpu}
                        memory={metrics.memory}
                        disk={metrics.disk}
                        network={metrics.network}
                    />
                </div>
            </div>

            {/* Error Monitoring */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ Error Monitoring</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-600 font-semibold mb-2">Failed Requests</p>
                        <p className="text-3xl font-bold text-red-700">{metrics.failedRequests || 0}</p>
                        <p className="text-xs text-red-500 mt-2">Last hour</p>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <p className="text-sm text-yellow-600 font-semibold mb-2">Avg Latency</p>
                        <p className="text-3xl font-bold text-yellow-700">{metrics.latency || 0} ms</p>
                        <p className="text-xs text-yellow-500 mt-2">Response time</p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <p className="text-sm text-orange-600 font-semibold mb-2">Downtime</p>
                        <p className="text-3xl font-bold text-orange-700">{metrics.downtime || 0} min</p>
                        <p className="text-xs text-orange-500 mt-2">Last 24 hours</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
