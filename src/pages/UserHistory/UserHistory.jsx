import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { GET_USER_HISTORY, SERVER_URL } from "../../utils/Constants.js";

import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

export default function UserHistory() {
    const [historyList, setHistoryList] = useState([]);

    const columns = [
        {
            field: "exercise",
            headerName: "🧮🔢 תרגיל",
            width: 150,
        },
        {
            field: "isCorrectAnswer",
            headerName: "❌/✔ תוצאה",
            width: 100,
            renderCell: (params) => (params.value ? "✔" : "❌"),
        },
        {
            field: "level",
            headerName: "🎯 רמה",
            width: 100,
        },
        {
            field: "questionType",
            headerName: "📘🔍 סוג שאלה",
            width: 160,
            renderCell: (params) => params.row?.questionType?.name ?? "לא זמין",
        },
        {
            field: "answer",
            headerName: "📝 תשובה סופית",
            width: 160,
        },
        {
            field: "solutionTime",
            headerName: "⏱ זמן פתרון",
            width: 160,
        },
        {
            field: "islands",
            headerName: "🌴 אי",
            width: 150,
            renderCell: (params) => params.row?.islands?.name ?? "לא זמין",
        },
    ];

    useEffect(() => {
        const token = Cookies.get("token");
        getUserHistory(token);
    }, []);

    const getUserHistory = async (token) => {
        try {
            const response = await axios.get(`${SERVER_URL}${GET_USER_HISTORY}?token=${token}`);
            if (response.status === 200 && Array.isArray(response.data)) {
                const normalizedList = response.data.map((item, index) => ({
                    ...item,
                    id: item.id ?? index, // חובה ל־DataGrid
                    questionType: item.questionType ?? { name: "לא זמין" },
                    islands: item.islands ?? { name: "לא זמין" },
                }));
                setHistoryList(normalizedList);
            }
        } catch (error) {
            console.error("שגיאה בשליפת היסטוריית המשתמש:", error);
        }
    };

    return (
        <div>
            <h2>📊 היסטוריית תרגולים</h2>
            <Box sx={{ height: 500, width: "100%" }}>
                <DataGrid
                    rows={historyList}
                    columns={columns}
                    pageSizeOptions={[10]}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 10 },
                        },
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}
