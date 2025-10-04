import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const COLORS = ['#ef4444', '#f59e0b', '#8b5cf6']

export default function TrafficChart({ trafficSources = {} }) {
    const data = [
        { name: 'Direct', value: trafficSources.direct || 0 },
        { name: 'Social', value: trafficSources.social || 0 },
        { name: 'Referral', value: trafficSources.referral || 0 },
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    )
}
