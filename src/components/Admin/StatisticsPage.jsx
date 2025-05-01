import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/Constants";
import {
    Box, Typography, Paper, CircularProgress
} from "@mui/material";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#00C49F", "#FF8042"];

export default function StatisticsPage() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = "admin12345";

    useEffect(() => {
        axios.get(`${SERVER_URL}/admin/statistics`, { params: { token } })
            .then(res => {
                setStats(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("שגיאה בטעינת סטטיסטיקה:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
                <CircularProgress />
            </Box>
        );
    }

    if (!stats) {
        return (
            <Box textAlign="center" mt={5}>
                <Typography color="error">❌ שגיאה בטעינת הנתונים</Typography>
            </Box>
        );
    }

    const summaryData = [
        { name: "משתמשים", value: stats.totalUsers },
        { name: "תרגילים", value: stats.totalExercises }
    ];

    const scoreData = [
        { name: "נכונים", value: +(stats.avgCorrectRate.toFixed(1)) },
        { name: "שגויים", value: +(100 - stats.avgCorrectRate.toFixed(1)) }
    ];

    return (
        <Box dir="rtl" p={4} maxWidth="900px" margin="auto">
            <Typography variant="h4" textAlign="center" gutterBottom>
                📊 סטטיסטיקה כללית
            </Typography>

            <Paper elevation={3} style={{ padding: "20px", marginBottom: "30px" }}>
                <Typography><b>👥 משתמשים רשומים:</b> {stats.totalUsers}</Typography>
                <Typography><b>✍️ סה״כ תרגילים שנפתרו:</b> {stats.totalExercises}</Typography>
                <Typography><b>✅ אחוז הצלחה ממוצע:</b> {stats.avgCorrectRate.toFixed(1)}%</Typography>
                <Typography><b>📈 ציון ממוצע:</b> {stats.avgScore.toFixed(1)}</Typography>
                <Typography><b>🗺️ מספר איים פתוחים ממוצע:</b> {stats.avgOpenIslands.toFixed(1)}</Typography>
                <Typography><b>🏅 משתמש מוביל:</b> {stats.topUser}</Typography>
            </Paper>

            <Box display="flex" flexWrap="wrap" justifyContent="space-around" gap={4}>
                <ResponsiveContainer width="45%" height={250}>
                    <BarChart data={summaryData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <ResponsiveContainer width="50%" height={250}>
                    <PieChart>
                        <Pie
                            data={scoreData}
                            cx="50%"
                            cy="50%"
                            label
                            outerRadius={80}
                            dataKey="value"
                        >
                            {scoreData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
}
