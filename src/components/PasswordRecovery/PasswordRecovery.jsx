import React, { useEffect, useState } from 'react';
import axios from "axios";
import { CHECK_OTP, LOGIN_URL, SERVER_URL } from "../../utils/Constants.js";
import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import Otp from "../Otp/Otp.jsx";
import { useNavigate } from "react-router-dom";
import './PasswordRecovery.css';

export default function PasswordRecovery() {
    const [email, setEmail] = useState();
    const [success, setSuccess] = useState(false);
    const { data: otpData, error: otpError, loading: otpLoading, sendRequest: sendOtpRequest } = usePostApi(CHECK_OTP);
    const [showOtp, setShowOtp] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (otpData) {
            if (otpData.success && otpData.registeredSuccessfuly) {
                setTimeout(() => {
                    setShowOtp(false);
                    navigate(LOGIN_URL);
                    window.location.reload();
                }, 5000);
            } else if (otpData.success === false) {
                alert("OTP is incorrect, please try again.");
            }
        }
        if (otpError) {
            alert(otpError);
        }
    }, [otpData, otpError, navigate]);

    const onOtpSubmit = async (otp) => {
        await sendOtpRequest({ email: email, otp });
        navigate("/newPassword");
    };

    const send = () => {
        console.log(email);
        axios.get(SERVER_URL + '/forgotten-password?email=' + email).then(
            response => {
                console.log(response.data);
                setSuccess(response.data);
                setShowOtp(true);
            }
        );
    };

    return (
        <div className="password-recovery-wrapper">
            <div className="password-recovery-overlay">
                {
                    !showOtp ? (
                            <div className="recovery-box">
                                <img className={"recovery-background"} src={"src/assets/images/pic3.png"} alt={"beach"}/>
                                <h1 className="title">שחזור סיסמא</h1>
                                <input
                                    type="email"
                                    className="email-input"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="הכנס/י את כתובת האימייל שלך"
                                />
                                <button className="send-button" onClick={send}>שלח</button>
                            </div>
                        ) :
                        <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} />
                }
            </div>
        </div>
    );
}