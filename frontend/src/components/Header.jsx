export default function Header() {
    return (
        <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">📊 EcomPulse</h1>
                        <p className="text-blue-100 mt-1">Real-Time E-Commerce Analytics Dashboard</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-sm">Live</span>
                        </div>
                        <div className="text-sm bg-white/20 px-4 py-2 rounded-lg backdrop-blur-sm">
                            Powered by Prometheus + Grafana
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
