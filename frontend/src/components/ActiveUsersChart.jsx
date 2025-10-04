import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function ActiveUsersChart({ activeUsers = 0, sessions = 0 }) {
    const data = [
        {
            name: 'Current Metrics',
            activeUsers: activeUsers,
            sessions: sessions,
        }
    ]

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                    contentStyle={{
                        backgroundColor: '#fff',
                        border: '1px solid #ddd',
                        borderRadius: '8px'
                    }}
                />
                <Legend />
                <Bar dataKey="activeUsers" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                <Bar dataKey="sessions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
