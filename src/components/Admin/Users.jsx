import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { SERVER_URL } from "../../utils/Constants.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useNavigate} from "react-router-dom";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [emails, setEmails] = useState([]);
    const [message, setMessage] = useState("");
    const [loggedUsers, setLoggedUsers] = useState([]);
    const navigate = useNavigate(); // בתוך הפונקציה הראשית

    const token = "admin12345"; // זמני, ניתן להחליף ב־Cookies.get("token")

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/admin/get-all-users?token=${token}`);
                if (response.status === 200 && Array.isArray(response.data)) {
                    const usersWithId = response.data.map((user, index) => ({
                        ...user,
                        id: user.id || index,
                    }));
                    setUsers(usersWithId);
                }
            } catch (error) {
                console.error("שגיאה בשליפת משתמשים:", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchLoggedUsers = async () => {
            try {
                const response = await axios.get(`${SERVER_URL}/get-logged-users?token=${token}`);
                if (response.status === 200 && Array.isArray(response.data)) {
                    setLoggedUsers(response.data.map(user => user.username));
                }
            } catch (error) {
                console.error("שגיאה בשליפת משתמשים מחוברים:", error);
            }
        };

        fetchLoggedUsers();
        const interval = setInterval(fetchLoggedUsers, 300000);

        return () => clearInterval(interval);
    }, []);

    const handleRowSelectionChange = (newSelectionModel) => {
        let array = newSelectionModel.ids;
        let filterArray = [];
        for (const id of array) {
            let u = users.find(user => user.id === id);
            if (u) {
                filterArray.push(u.email);
            }
        }
        setEmails(filterArray);
        setSelectedIds(Array.from(newSelectionModel));
    };

    const handleSendMessage = async () => {
        try {
            const response = await axios.post(`${SERVER_URL}/admin/send-email-for-users`, {
                token: token,
                emails: emails,
                massage: message,
            });

            if (response.data.success) {
                alert("✅ ההודעה נשלחה בהצלחה!");
            } else {
                alert("❌ " + response.data.message);
            }
        } catch (error) {
            console.error("שגיאה בשליחה לשרת:", error);
            alert("שגיאה בשליחת ההודעה לשרת");
        }
    };

    const columns = [
        { field: "firstName", headerName: "שם פרטי", width: 130 },
        { field: "lastName", headerName: "שם משפחה", width: 130 },
        { field: "username", headerName: "שם משתמש", width: 130 },
        { field: "age", headerName: "גיל", width: 90 },
        { field: "email", headerName: "אימייל", width: 180 },
        { field: "score", headerName: "ציון", width: 100 },
        { field: "gender", headerName: "מגדר", width: 100 },
        {
            field: "status",
            headerName: "סטטוס",
            width: 130,
            renderCell: (params) => {
                const isOnline = loggedUsers.includes(params.row.username);
                return isOnline ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{
                            display: 'inline-block',
                            width: 12,
                            height: 12,
                            backgroundColor: 'green',
                            borderRadius: '50%',
                        }}></span>
                        <span style={{ fontSize: "0.9em" }}>מחובר</span>
                    </div>
                ) : null;
            }
        }
    ];

    return (
        <div dir="rtl" style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>📋 רשימת משתמשים</h2>

            <p style={{ textAlign: "center", fontSize: "18px", marginBottom: "10px" }}>
                מספר משתמשים: <b>{users.length}</b> |
                <span style={{ color: "green" }}> מחוברים כעת: <b>{loggedUsers.length}</b></span>
            </p>

            <Box sx={{ height: 500, width: "100%", marginBottom: 3 }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleRowSelectionChange}
                    onRowClick={(params) => navigate(`/user-info/${params.row.email}`)}

                />
            </Box>

            <TextField
                label="הודעה"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    endIcon={<span>📧</span>}
                >
                    שלח הודעה לנבחרים
                </Button>
            </div>
        </div>
    );
}
