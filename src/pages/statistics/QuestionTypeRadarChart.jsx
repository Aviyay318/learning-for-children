import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    Tooltip, ResponsiveContainer
} from 'recharts';

import PropTypes from 'prop-types';

export default function QuestionTypeRadarChart({ data }) {
    if (!data || typeof data !== "object") return null;

    // המרה למבנה ש-Recharts דורש
    const chartData = Object.entries(data).map(([type, stats]) => ({
        subject: type,
        correctRate: parseFloat(stats.correctRate)
    }));

    return (
        <div style={{
            width: "100%",
            height: 400,
            backgroundColor: "#e0f7fa",
            borderRadius: "12px",
            padding: "1rem",
            boxShadow: "0 0 10px #4dd0e1"
        }}>
            <h3 style={{ textAlign: 'center', marginBottom: "1rem", color: "#00796B" }}>
                🧠 חוזקות לפי סוג שאלה
            </h3>
            <ResponsiveContainer>
                <RadarChart data={chartData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                    <Tooltip />
                    <Radar
                        name="אחוז הצלחה"
                        dataKey="correctRate"
                        stroke="#00bcd4"
                        fill="#00bcd4"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

QuestionTypeRadarChart.propTypes = {
    data: PropTypes.object.isRequired
};
