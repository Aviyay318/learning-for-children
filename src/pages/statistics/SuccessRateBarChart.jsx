import {
    BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend
} from 'recharts';

export default function SuccessRateBarChart({ data }) {
    // ממירים את המידע למבנה שמתאים ל-Recharts
    const chartData = Object.entries(data).map(([type, stats]) => ({
        name: type,
        successRate: parseFloat(stats.correctRate),
        avgTime: parseFloat(stats.averageTime)
    }));

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="successRate" fill="#4CAF50" name="אחוז הצלחה" />
                    <Bar dataKey="avgTime" fill="#2196F3" name="זמן ממוצע (שניות)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
