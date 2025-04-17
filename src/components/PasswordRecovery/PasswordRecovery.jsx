import React, { useEffect, useState } from 'react';
import { CHECK_OTP, LOGIN_URL, PASSWORD_RECOVERY_API } from "../../utils/Constants.js";
import useApi from "../../hooks/apiHooks/useApi.js";
import { useNavigate } from "react-router-dom";
import Otp from "../Otp/Otp.jsx";
import { useForm } from "../../hooks/formHooks/useForm.js";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator.js";
import './PasswordRecovery.css';
import MessageBubble from "../MessageBubble/MessageBubble.jsx";
import { useBubbleError } from "../../hooks/uiHooks/useBubbleError";
import FormField from "../../pages/forms/FormField.jsx";

export default function PasswordRecovery() {
    const navigate = useNavigate();
    const [showOtp, setShowOtp] = useState(false);

    const { formData, handleChange } = useForm({ email: "" });
    const { errors, validateField, validateAll, touched, setErrors, shouldDisable } = useFormValidator(formData, {
        email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
    });

    const { data: otpData, error: otpError, sendRequest: sendOtpRequest } = useApi(CHECK_OTP, "POST");
    const { sendRequest: sendRecoveryRequest } = useApi(PASSWORD_RECOVERY_API, "GET");

    const { bubbleMessage, lockButton, showMessage, clearError } = useBubbleError();

    useEffect(() => {
        if (otpData?.success && otpData.registeredSuccessfully) {
            setShowOtp(false);
            navigate(LOGIN_URL);
        } else if (otpData?.success === false || otpError) {
            showMessage("קוד שגוי. נסה שוב.");
        }
    }, [otpData, otpError, navigate]);

    const onOtpSubmit = async (otp) => {
        await sendOtpRequest({ email: formData.email, otp });
        navigate("/newPassword");
    };

    const handleRecovery = async () => {
        const validation = validateAll();

        if (Object.keys(validation).length === 0) {
            const response = await sendRecoveryRequest({ email: formData.email });

            console.log(response);
            if (response?.success) {
                setShowOtp(true);
                clearError();
            } else {
                showMessage(response?.message || "שגיאה בשליחת המייל");
            }
        } else {
            setErrors(validation);
        }
    };

    const wrappedHandleChange = (e) => {
        handleChange(e);
        clearError();
    };

    return (
        <div className="password-recovery-wrapper">
            <div className="password-recovery-overlay flex">
                {!showOtp ? (
                    <div className="recovery-box">
                        <img className="recovery-background" src="src/assets/images/PasswordRecovery/password-recovery-bg.png" alt="beach" />

                        {bubbleMessage && (
                            <MessageBubble
                                message={bubbleMessage}
                                position={{ top: "43%", right: "50%" }}
                                scale={"0.8"}
                                type={"error"}
                            />
                        )}

                        <h1 className="title">שחזור סיסמא</h1>
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
                            <button
                                className="send-button"
                                onClick={handleRecovery}
                                disabled={shouldDisable || lockButton}
                            >
                                שלח
                            </button>
                        </div>
                        {errors.email && <label className="input-error">{errors.email}</label>}
                    </div>
                ) : (
                    <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} />
                )}
            </div>
        </div>
    );
}
