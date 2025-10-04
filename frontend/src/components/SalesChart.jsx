import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useState, useEffect } from 'react'

export default function SalesChart() {
    const [data, setData] = useState([])

    useEffect(() => {
        // Simulate historical data - in production, this would come from Prometheus
        const generateData = () => {
            const hours = 24
            const newData = []
            for (let i = 0; i < hours; i++) {
                newData.push({
                    hour: `${i}:00`,
                    revenue: Math.floor(Math.random() * 5000 + 2000),
                    orders: Math.floor(Math.random() * 200 + 50)
                })
            }
            setData(newData)
        }

        generateData()
        const interval = setInterval(generateData, 10000) // Update every 10 seconds

        return () => clearInterval(interval)
    }, [])

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="hour" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
                <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}
