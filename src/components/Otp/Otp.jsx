import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import { useOtpLogic } from "../../hooks/useOtpLogic";
import useApi from "../../hooks/apiHooks/useApi";
import { CHECK_OTP, CHECK_OTP_TO_REGISTER } from "../../utils/Constants.js";
import { useBubbleMessage } from "../../hooks/uiHooks/useBubbleMessage";
import MessageBubble from "../MessageBubble/MessageBubble.jsx";
import "./Otp.css";

const images = {
    BOY_OTP: "src/assets/images/Otp/boy_otp.png",
    BOY_OTP_ERROR: "src/assets/images/Otp/boy_otp_error.png",
    BOY_OTP_SUCCESS: "src/assets/images/Otp/boy_otp_success.png"
}

export default function Otp({
                                username = "משתמש",
                                email,
                                arrayLength = 6,
                                url: navigateToUrl,
                                urlState,
                                endpoint
                            }) {
    const navigate = useNavigate();
    const {
        otp,
        otpToSubmit,
        inputRefs,
        handleChange,
        handleKeyDown,
        handleClick,
        handlePaste,
    } = useOtpLogic(arrayLength);

    const {
        bubbleMessage,
        lockButton,
        showMessage,
        clearError,
        bubbleType,
        handleBubbleType
    } = useBubbleMessage();

    const {
        data: otpData,
        error: otpError,
        sendRequest: verifyOtp
    } = useApi(endpoint, "POST");

    const [image, setImage] = useState(images.BOY_OTP);

    function handleBubbleAndImage(message, image, type){
        setImage(image)
        handleBubbleType(type)
        showMessage(message)
    }

    useEffect(() => {
        handleBubbleAndImage("שלחנו לך קוד התחברות דרך המייל", images.BOY_OTP, "info")
    }, []);



    useEffect(() => {
        console.log("OTP DATA:", otpData);
        console.log("OTP ERROR:", otpError);
        if (otpData?.success && otpData.registeredSuccessfully) {
            clearError();
            handleBubbleAndImage("האימות הצליח!", images.BOY_OTP_SUCCESS, "confirmation")
            setTimeout(() => navigate(navigateToUrl, urlState), 1500);
        } else if (otpData?.success === false || otpError) {
            handleBubbleAndImage("הקוד שהוזן שגוי. נסו שוב.", images.BOY_OTP_ERROR, "error")
        }
    }, [otpData, otpError, navigate]);


    const handleInputChange = (e, index) => {
        handleChange(e, index);
        clearError(); // this will also unlock the button
    };

    const handleSubmit = async () => {
        await verifyOtp({ email, otp: otpToSubmit });
    };



    const isButtonDisabled = otpToSubmit.length < arrayLength || lockButton;

    return (
        <div className="otp-component-container">
            <div className={"otp-container"}>
                <div className={"otp-box"}>
                    <header className="otp-header">
                        {bubbleMessage && (
                            <MessageBubble
                                message={bubbleMessage}
                                type={bubbleType}
                                scale="0.8"
                                position={{ top: "23%", right: "55%" }}
                            />
                        )}
                        <img className="otp-image" src={image} alt="otp" />

                    </header>

                    {/*{!otpData?.success &&*/}
                        <footer className={"otp-footer flex"}>
                            <h1 className="otp-title">בדיקת אבטחה</h1>
                            <div className="otp-input-wrapper">
                                {otp.map((value, index) => (
                                    <OtpInput
                                        key={index}
                                        index={index}
                                        value={value}
                                        onChange={(e) => handleInputChange(e, index)}
                                        onKeyDown={handleKeyDown}
                                        onClick={handleClick}
                                        onPaste={handlePaste}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                    />
                                ))}
                            </div>
                            <button
                                className={`otp-submit-button ${!isButtonDisabled ? "active" : ""}`}
                                disabled={isButtonDisabled}
                                onClick={handleSubmit}
                            >
                                שלח קוד לבדיקה
                            </button>
                        </footer>
                    {/*}*/}
                </div>

            </div>
        </div>
    );
}
