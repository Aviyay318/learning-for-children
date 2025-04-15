// src/components/Otp/Otp.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import { useOtpLogic } from "../../hooks/useOtpLogic";
import "./Otp.css";

function Otp({username = "Guest", arrayLength, onOtpSubmit, isVerified, verifiedMessage, unverifiedMessage,}) {
    const navigate = useNavigate();
    const {
        otp, otpToSubmit, inputRefs, handleChange, handleKeyDown, handleClick, handlePaste,
    } = useOtpLogic(arrayLength);

    const handleSubmit = () => {
        console.log("OTP SUB:", otpToSubmit);
        onOtpSubmit(otpToSubmit);
    };

    return (
        <div className="otp-container">
            <header className="otp-header">
                <label className="otp-title">🛡️ בדיקת אבטחה</label>
                <p className="otp-subtitle">
                    שלום {username},
שלחנו לך קוד התחברות דרך המייל                </p>
                <p className="otp-subtitle">
                    נא הזן אותו כאן
                </p>
            </header>
            <div className="otp-input-wrapper">
                {otp.map((value, index) => (
                    <OtpInput
                        key={index}
                        index={index}
                        value={value}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        onClick={handleClick}
                        onPaste={handlePaste}
                        ref={(el) => (inputRefs.current[index] = el)}
                    />
                ))}
            </div>
            <button
                className={`otp-submit-button ${otpToSubmit.length === arrayLength ? "active" : ""}`}
                disabled={otpToSubmit.length < arrayLength}
                onClick={handleSubmit}
            >
                שלח
            </button>
            {isVerified !== undefined && (
                <p className="otp-feedback">
                    {isVerified ? verifiedMessage : unverifiedMessage}
                </p>
            )}
        </div>
    );
}

export default Otp;
