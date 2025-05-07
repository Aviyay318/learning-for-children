import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import PropTypes from 'prop-types';

export default function ProgressLineChart({ data = [] }) {
    if (!Array.isArray(data)) return null;

    // ממיר מחרוזות תאריך עם שעה לתאריך בלבד
    const chartData = data.map(day => ({
        date: new Date(day.date).toLocaleDateString("he-IL", {
            day: "2-digit",
            month: "2-digit"
        }),
        successRate: parseFloat(day.correctRate),
        total: day.total
    }));

    return (
        <div style={{
            width: "100%",
            height: 300,
            backgroundColor: "#fff7e6",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 0 10px #ffd180"
        }}>
            <ResponsiveContainer>
                <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="4 4" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" unit="%" domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="successRate"
                        stroke="#4CAF50"
                        name="🟢 אחוז הצלחה"
                        strokeWidth={3}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="total"
                        stroke="#2196F3"
                        name="📘 סה\כ תרגילים"
                        strokeDasharray="5 5"
                    strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

ProgressLineChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.string.isRequired,
            correctRate: PropTypes.string.isRequired,
            total: PropTypes.number.isRequired
        })
    )
};
