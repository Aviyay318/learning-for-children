import "./Statistics.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { GET_STATISTICS_DATA, SERVER_URL } from "../../utils/Constants.js";
import Cookies from "js-cookie";
import QuestionTypeRadarChart from "./QuestionTypeRadarChart.jsx";
import ProgressLineChart from "./ProgressLineChart.jsx";



const typeColors = {
    "פעולות חשבון": "#e3f2fd",
    "בעיות מילוליות": "#fce4ec",
    "משוואות": "#f3e5f5",
    "לוח הכפל": "#fff3e0",
    "שברים": "#ede7f6",
    "כפל ארוך": "#e8f5e9"
};

const typeIcons = {
    "פעולות חשבון": "➕",
    "בעיות מילוליות": "📝",
    "משוואות": "🔺",
    "לוח הכפל": "✖️",
    "שברים": "🧁",
    "כפל ארוך": "📐"
};

export default function Statistics() {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const token = Cookies.get("token");
            const res = await axios.get(`${SERVER_URL}${GET_STATISTICS_DATA}?token=${token}`);
            setStatistics(res.data);
        };
        fetchStats();
    }, []);

    const getComplimentTip = (type, rate) => {
        const rateNum = parseFloat(rate);
        if (rateNum >= 90) return `✨ וואו! אתה מצטיין ב-${type}!`;
        if (rateNum >= 75) return `💪 כל הכבוד! אתה חזק ב-${type}`;
        if (rateNum >= 50) return `👍 משתפר יפה ב-${type}`;
        return `🚀 אל תוותר! תמשיך לתרגל ב-${type}`;
    };

    const getStarIfExcellent = (rate) => {
        return parseFloat(rate) >= 90 ? " ⭐" : "";
    };

    return (
        <div className="statistics-container flex column">
            <div className="statistics-header header glass">
                <h1 className="animated-title">📊 סטטיסטיקה אישית</h1>
            </div>

            <div className="statistics-body flex column glass">
                {!statistics ? (
                    <p>טוען נתונים...</p>
                ) : (
                    <>
                        <div className="glass-block summary-block big-card bounce">
                            <h2>📋 סיכום כללי</h2>
                            <div className="card-content">
                                <p>🧮 שאלות שנענו: {statistics.totalQuestions}</p>
                                <p>✅ תשובות נכונות: {statistics.correctAnswers}</p>
                                <p>❌ תשובות שגויות: {statistics.incorrectAnswers}</p>
                                <p>⏳ לא נענו: {statistics.unanswered}</p>
                                <p>🏅 אחוז הצלחה: {statistics.correctRate}%</p>
                                <p>⏱️ זמן פתרון ממוצע: {statistics.averageSolutionTime} שניות</p>
                            </div>
                        </div>

                        {statistics.byQuestionType && (
                            <div className="glass-block">
                                <h2>📚 לפי סוג שאלה</h2>
                                <div className="cards-container">
                                    {Object.entries(statistics.byQuestionType || {}).map(([type, data]) => (
                                        <div
                                            key={type}
                                            className="type-card animated pulse"
                                            data-tip={getComplimentTip(type, data.correctRate)}
                                            style={{ backgroundColor: typeColors[type] || "#f0f0f0" }}
                                        >
                                            <h3>{typeIcons[type] || "❓"} {type}{getStarIfExcellent(data.correctRate)}</h3>
                                            <p>🔢 שאלות: {data.total}</p>
                                            <p>✅ נכונות: {data.correct}</p>
                                            <p>📈 הצלחה: {data.correctRate}%</p>
                                            <p>⏱️ זמן ממוצע: {data.averageTime} שניות</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {statistics.progressByDate && (
                            <div className="glass-block">
                                <h2>📆 התקדמות לפי ימים</h2>
                                <ProgressLineChart data={statistics.progressByDate} />
                            </div>
                        )}

                        {statistics.byQuestionType && (
                            <div className="glass-block">
                                <h2>🧠 חוזקות</h2>
                                <QuestionTypeRadarChart data={statistics.byQuestionType} />
                            </div>
                        )}

                        <div className="glass-block">
                            <h2>🏝️ לפי אי וסוג שאלה</h2>
                            {Object.entries(statistics.byIslandAndType || {}).map(([island, types]) => (
                                <div key={island} className="island-card">
                                    <h3>{island}</h3>
                                    <ul>
                                        {Object.entries(types).map(([type, count]) => (
                                            <li key={type}>🔸 {type}: {count}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
