import axios from "axios";
import { SERVER_URL } from "../../utils/Constants.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const updatePassword = () => {
        setErrorMessage(""); // איפוס שגיאה קודמת

        if (password !== confirmPassword) {
            setErrorMessage("הסיסמאות אינן תואמות");
            return;
        }

        axios
            .get(`${SERVER_URL}/recovery-password?email=${email}&password=${password}`)
            .then((response) => {
                if (response.data === true) {
                    navigate("/"); // מעבר לדף התחברות
                } else {
                    setErrorMessage("עדכון הסיסמה נכשל. ודא שהאימייל נכון או נסה שוב.");
                }
            })
            .catch((error) => {
                console.error("שגיאה בשרת:", error);
                setErrorMessage("שגיאה בשרת. נסה מאוחר יותר.");
            });
    };

    return (
        <div>
            <h1>איפוס סיסמה</h1>
            <input
                type="email"
                value={email}
                placeholder="אימייל"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="סיסמה חדשה"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        value={confirmPassword}
        placeholder="אימות סיסמה"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={updatePassword}>עדכן סיסמה</button>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
