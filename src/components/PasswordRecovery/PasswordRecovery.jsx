import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CHECK_OTP, PASSWORD_RECOVERY_API } from "../../utils/Constants";
import useApi from "../../hooks/apiHooks/useApi";
import { useForm } from "../../hooks/formHooks/useForm";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator";
import { useBubbleMessage } from "../../hooks/uiHooks/useBubbleMessage";
import FormField from "../../pages/forms/FormField";
import MessageBubble from "../MessageBubble/MessageBubble";
import Otp from "../Otp/Otp";

import "./PasswordRecovery.css";

export default function PasswordRecovery() {
    const navigate = useNavigate();
    const [showOtp, setShowOtp] = useState(false);

    const { formData, handleChange } = useForm({ email: "" });

    const {
        errors,
        touched,
        validateField,
        validateAll,
        shouldDisable,
        setErrors,
    } = useFormValidator(formData, {
        email: (v) =>
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
    });

    const { sendRequest: sendRecoveryRequest } = useApi(PASSWORD_RECOVERY_API, "GET");
    const {
        bubbleMessage,
        lockButton,
        showMessage,
        clearError,
    } = useBubbleMessage();

    const handleRecovery = async () => {
        const validation = validateAll();

        if (Object.keys(validation).length > 0) {
            return setErrors(validation);
        }

        const response = await sendRecoveryRequest({ email: formData.email });

        if (response?.success) {
            setShowOtp(true);
            clearError();
        } else {
            showMessage(response?.message || "שגיאה בשליחת המייל");
        }
    };

    const onChange = (e) => {
        handleChange(e);
        clearError();
    };

    return (


        <div className="password-recovery-wrapper">
            {!showOtp ? (
            <div className="password-recovery-overlay flex">
                {bubbleMessage && (
                    <MessageBubble
                        message={bubbleMessage}
                        position={{ top: "43%", right: "50%" }}
                        scale="0.8"
                        type="error"
                    />
                )}

                    <div className="recovery-box">
                        <img
                            className="recovery-background"
                            src="src/assets/images/PasswordRecovery/password-recovery-bg.png"
                            alt="beach"
                        />
                        <h1 className="title">שחזור סיסמא</h1>

                        <div className="recovery-form flex">
                            <FormField
                                name="email"
                                label="אימייל"
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    onChange(e);
                                    validateField("email", e.target.value);
                                }}
                                error={touched.email && errors.email}
                            />

                            <button
                                className="send-button"
                                onClick={handleRecovery}
                                disabled={shouldDisable || lockButton}
                            >
                                שלח
                            </button>
                        </div>
                    </div>

            </div>
            ) : (
            <Otp
                email={formData.email}
                url="/newPassword"
                arrayLength={6}
                endpoint={CHECK_OTP}
            />
            )}
        </div>
    );
}
