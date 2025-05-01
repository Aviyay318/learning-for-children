import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../utils/Constants.js";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function UserInfo() {
    const { email } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showHistory, setShowHistory] = useState(false);
    const token = "admin12345"; // טוקן זמני

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin/get-user-info`, {
                    params: { token, email }
                });
                setInfo(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("שגיאה בשליפת מידע על המשתמש:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, [email]);

    if (loading) return <p style={{ textAlign: "center" }}>⏳ טוען מידע...</p>;
    if (!info) return <p style={{ textAlign: "center", color: "red" }}>❌ לא נמצא מידע על המשתמש.</p>;

    return (
        <div dir="rtl" style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
            <h2 style={{ textAlign: "center" }}>🧾 פרטי משתמש</h2>

            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <Button variant="outlined" color="primary" onClick={() => navigate("/users")}>
                    ← חזור לניהול משתמשים
                </Button>
            </div>

            <div style={{ fontSize: "16px", lineHeight: "1.8" }}>
                <p><b>שם משתמש:</b> {info.username}</p>
                <p><b>אימייל:</b> {email}</p>
                <p><b>ניקוד:</b> {info.score}</p>
                <p><b>סה״כ תרגילים:</b> {info.exercise}</p>
                <p><b>תרגילים שענה נכון:</b> {info.correctAnswer}</p>
                <p><b>תרגילים שענה שגוי:</b> {info.wrongAnswer}</p>
                <p>
                    <b>איים פתוחים:</b>{" "}
                    {Array.isArray(info.openIsland)
                        ? info.openIsland
                            .filter(island => island.isOpen)
                            .map(island => island.name)
                            .join(", ")
                        : "לא נפתחו"}
                </p>
            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => setShowHistory(!showHistory)}
                >
                    {showHistory ? "הסתר היסטוריית תרגילים" : "הצג היסטוריית תרגילים 🧠"}
                </Button>
            </div>

            {showHistory && (
                <>
                    <h3 style={{ marginTop: "30px" }}>📊 היסטוריית תרגילים</h3>
                    <Box sx={{ height: 500, width: '100%', marginTop: 2 }}>
                        <DataGrid
                            rows={info.userHistory?.map((ex, index) => ({
                                id: index,
                                name: ex.exercise || "ללא שם",
                                correct: ex.isCorrectAnswer,
                                date: ex.date || "—",
                                island: ex.islands?.name || "—",
                                type: ex.questionType?.name || "—"
                            })) || []}
                            columns={[
                                { field: "name", headerName: "שם תרגיל", width: 200 },
                                { field: "type", headerName: "סוג תרגיל", width: 160 },
                                { field: "island", headerName: "שם האי", width: 180 },
                                {
                                    field: "correct",
                                    headerName: "נכון?",
                                    width: 100,
                                    renderCell: (params) => (
                                        params.row.correct
                                            ? <span style={{ color: "green" }}>✔️</span>
                                            : <span style={{ color: "red" }}>❌</span>
                                    )
                                },
                                { field: "date", headerName: "תאריך", width: 200 }
                            ]}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                        />
                    </Box>
                </>
            )}
        </div>
    );
}
