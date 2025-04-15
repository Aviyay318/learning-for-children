import React, { useEffect, useState } from 'react';
import { CHECK_OTP, LOGIN_URL } from "../../utils/Constants.js";
import useApi from "../../hooks/apiHooks/useApi.js";
import { useNavigate } from "react-router-dom";
import Otp from "../Otp/Otp.jsx";
import { useForm } from "../../hooks/formHooks/useForm.js";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator.js";
import './PasswordRecovery.css';

export default function PasswordRecovery() {
    const navigate = useNavigate();
    const [showOtp, setShowOtp] = useState(false);

    const { formData, handleChange } = useForm({ email: "" });
    const { errors, isValid, validateField, validateAll, setErrors, shouldDisable } = useFormValidator(formData, {
        email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
    });

    const { data: otpData, error: otpError, sendRequest: sendOtpRequest } = useApi(CHECK_OTP, "POST");
    const { sendRequest: sendRecoveryRequest } = useApi("/forgotten-password", "GET");

    useEffect(() => {
        if (otpData?.success && otpData.registeredSuccessfully) {
                setShowOtp(false);
                navigate(LOGIN_URL);
        } else if (otpData?.success === false || otpError) {
            alert("OTP is incorrect, please try again.");
        }
    }, [otpData, otpError, navigate]);

    const onOtpSubmit = async (otp) => {
        await sendOtpRequest({ email: formData.email, otp });
        navigate("/newPassword");
    };

    const handleRecovery = async () => {
        const validation = validateAll();
        if (Object.keys(validation).length === 0) {
            await sendRecoveryRequest({ email: formData.email });
            setShowOtp(true);
        } else {
            setErrors(validation);
        }
    };

    return (
        <div className="password-recovery-wrapper">
            <div className="password-recovery-overlay flex">
                {
                    !showOtp ? (
                        <div className="recovery-box">
                            <img className="recovery-background" src="src/assets/images/PasswordRecovery/password-recovery-bg.png" alt="beach" />
                            <h1 className="title">שחזור סיסמא</h1>
                            <div className="recovery-form flex">
                                <input
                                    type="email"
                                    className="email-input"
                                    name="email"
                                    value={formData.email}
                                    onChange={(e) => {
                                        handleChange(e);
                                        validateField("email", e.target.value);
                                    }}
                                    placeholder="הכנס/י את כתובת האימייל שלך"
                                />
                                <button
                                    className="send-button"
                                    onClick={handleRecovery}
                                    disabled={shouldDisable}
                                >
                                    שלח
                                </button>
                            </div>
                            {errors.email && <label className="input-error">{errors.email}</label>}
                        </div>
                    ) : (
                        <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} />
                    )
                }
            </div>
        </div>
    );
}
