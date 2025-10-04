import { useState, useEffect } from 'react'
import axios from 'axios'
import Dashboard from './components/Dashboard'
import Header from './components/Header'

function App() {
    const [metrics, setMetrics] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                // Fetch from Prometheus via backend proxy
                const response = await axios.get('http://localhost:5000/api/metrics')
                setMetrics(response.data)
                setError(null)
            } catch (err) {
                console.error('Error fetching metrics:', err)
                setError('Failed to fetch metrics. Make sure the backend is running.')
            } finally {
                setLoading(false)
            }
        }

        // Initial fetch
        fetchMetrics()

        // Poll every 5 seconds for real-time updates
        const interval = setInterval(fetchMetrics, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {loading && (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading dashboard...</p>
                    </div>
                </div>
            )}

            {error && (
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                        <p className="font-semibold">⚠️ Error</p>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {!loading && !error && metrics && (
                <Dashboard metrics={metrics} />
            )}
        </div>
    )
}

export default App
