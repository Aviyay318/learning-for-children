import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { SERVER_URL } from "../../utils/Constants.js";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const[emails,setEmails] = useState([])
    const [message, setMessage] = useState("");
    const token = "admin12345";
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/get-all-users?token=${token}`);
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

    const handleRowSelectionChange = (newSelectionModel) => {

        let array = newSelectionModel.ids;
        let filterArray = []
        for (const id of array) {
            let u = users.filter(user => user.id === id);
            if (u.length>0){
                filterArray.push(u[0].email);
            }
        }
        console.log(filterArray)
        setEmails(filterArray)
        setSelectedIds(Array.from(newSelectionModel));
    };

    const handleSendMessage = async () => {
        console.log("s : ", emails);

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

            console.log("שרת החזיר:", response.data);
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
    ];

    return (
        <div dir="rtl" style={{ padding: "20px" }}>
            <h2 style={{ textAlign: "center" }}>📋 רשימת משתמשים</h2>

            <Box sx={{ height: 500, width: "100%", marginBottom: 3 }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    checkboxSelection
                    disableRowSelectionOnClick
                    onRowSelectionModelChange={handleRowSelectionChange}
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
            {
                emails.length!==0&&<div>
                    {
                        emails.map((email,index)=>{
                          return  <div key={index}>{email.email}</div>
                        })
                    }
                </div>
            }
        </div>
    );
}
