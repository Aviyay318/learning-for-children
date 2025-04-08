import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/Constants.js";
import { useNavigate } from "react-router-dom";
import "./PasswordRecovery.css";
import successSoundFile from "../../assets/sounds/RightAnswer.wav";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";

export default function NewPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [play] = useSound(successSoundFile);

    const updatePassword = () => {
        if (password !== confirmPassword) {
            setError("הסיסמאות אינן תואמות");
            return;
        }

        axios
            .get(`${SERVER_URL}/recovery-password?email=${email}&password=${password}`)
            .then((response) => {
                if (response.data === true) {
                    setSuccess(true);
                    play();
                    setTimeout(() => {
                        navigate("/");
                    }, 3000);
                } else {
                    setError("אירעה שגיאה בעדכון הסיסמה");
                }
            })
            .catch(() => setError("שגיאה בבקשה לשרת"));
    };

    return (
        <div className="password-recovery-wrapper new-password-wrapper">
            <div className="password-recovery-overlay">
                <div className="recovery-box">
                    <h1 className="title">איפוס סיסמה</h1>

                    <div className="form-fields">
                        <input
                            type="email"
                            placeholder="אימייל"
                            className="email-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="סיסמה חדשה"
                            className="email-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="אימות סיסמה"
                            className="email-input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className="send-button" onClick={updatePassword}>
                            עדכן סיסמה
                        </button>
                    </div>

                    {error && <p className="error-text">{error}</p>}

                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                                className="success-bubble"
                            >
                                ✅ הסיסמה עודכנה בהצלחה!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
