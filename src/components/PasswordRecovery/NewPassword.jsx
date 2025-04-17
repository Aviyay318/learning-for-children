import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {LOGIN_URL, NEW_PASSWORD_API} from "../../utils/Constants.js";
import useApi from "../../hooks/apiHooks/useApi.js";
import { useForm } from "../../hooks/formHooks/useForm.js";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator.js";
import MessageBubble from "../MessageBubble/MessageBubble.jsx";
import { useBubbleError } from "../../hooks/uiHooks/useBubbleError";
import useSound from "use-sound";
import successSoundFile from "../../assets/sounds/RightAnswer.wav";
import "./PasswordRecovery.css";
import FormField from "../../pages/forms/FormField.jsx";

export default function NewPassword() {
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [play] = useSound(successSoundFile);

    const { formData, handleChange } = useForm({
        email: "",
        password: "",
        confirmPassword: "",
    });

    const validationRules = {
        email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
        password: (v) => v.length < 6 ? "הסיסמא צריכה להיות לפחות 6 תווים" : "",
        confirmPassword: (v, data) =>
            v !== data.password ? "הסיסמאות אינן תואמות" : "",
    };

    const {
        errors,
        validateField,
        validateAll,
        touched,
        shouldDisable,
        setErrors,
    } = useFormValidator(formData, validationRules);

    const {
        data: resetData,
        error: resetError,
        sendRequest: sendPasswordReset,
    } = useApi(NEW_PASSWORD_API, "GET");

    const { bubbleMessage, lockButton, showMessage, clearError } = useBubbleError();

    useEffect(() => {
        console.log("asdsadas",resetData)
        if(resetData){
            if (resetData.success === true) {
                play();
                setSuccess(true);
                clearError();
                setTimeout(() => {
                    navigate(LOGIN_URL);
                },1000)
            } else if (resetData.success === false) {
                showMessage("אירעה שגיאה בעדכון הסיסמה");
            }

        }

        if (resetError) {
            showMessage("שגיאה בבקשה לשרת");
        }
    }, [resetData, resetError]);

    const handleSubmit = async () => {
        const validation = validateAll();
        if (Object.keys(validation).length === 0) {
            await sendPasswordReset({ email: formData.email, password: formData.password });
        } else {
            setErrors(validation);
        }
    };

    const wrappedHandleChange = (e) => {
        handleChange(e);
        clearError();
    };

    return (
        <div className="new-password-wrapper">
            <div className="password-recovery-overlay flex">
                <div className="recovery-box">
                    <img
                        className="recovery-background"
                        src="src/assets/images/PasswordRecovery/Picture1.png"
                        alt="beach"
                    />

                    {bubbleMessage && (
                        <MessageBubble
                            message={bubbleMessage}
                            position={{ top: "38%", right: "50%" }}
                            scale={"0.8"}
                            type={"error"}
                        />
                    )}

                    {success && (
                        <MessageBubble
                            message="הסיסמה עודכנה בהצלחה!"
                            position={{ top: "40%", right: "50%" }}
                            scale="0.85"
                            type={"confirmation"}
                        />
                    )}

                    <h1 className="title">איפוס סיסמה</h1>

                    <div className="recovery-form flex">
                        <FormField
                            name="email"
                            label="אימייל"
                            type="email"
                            value={formData.email}
                            onChange={(e) => {
                                wrappedHandleChange(e);
                                validateField("email", e.target.value);
                            }}
                            error={touched.email && errors.email}
                        />
                        <FormField
                            name="password"
                            label="סיסמה חדשה"
                            type="password"
                            value={formData.password}
                            onChange={(e) => {
                                wrappedHandleChange(e);
                                validateField("password", e.target.value);
                            }}
                            error={touched.password && errors.password}
                        />
                        <FormField
                            name="confirmPassword"
                            label="אימות סיסמה"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => {
                                wrappedHandleChange(e);
                                validateField("confirmPassword", e.target.value);
                            }}
                            error={touched.confirmPassword && errors.confirmPassword}
                        />

                        <button
                            className="send-button"
                            onClick={handleSubmit}
                            disabled={shouldDisable || lockButton}
                        >
                            עדכן סיסמה
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
