import { useState, useRef, useEffect } from "react";

export const useOtpLogic = (arrayLength) => {
    const [otp, setOtp] = useState(Array(arrayLength).fill(""));
    const [otpToSubmit, setOtpToSubmit] = useState("");
    const inputRefs = useRef([]);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (e, index) => {
        const { value } = e.target;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setOtpToSubmit(newOtp.join(""));

        // Move focus to next input if available
        if (value && index < arrayLength - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        const key = e.key.toLowerCase();
        if ((key === "backspace" || key === "delete") && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
        if (key === "arrowleft" && index > 0) {
            e.preventDefault();
            inputRefs.current[index - 1]?.focus();
        }
        if (key === "arrowright" && index < arrayLength - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index]?.setSelectionRange(1, 1);
        const firstEmptyIndex = otp.indexOf("");
        if (firstEmptyIndex !== -1) {
            inputRefs.current[firstEmptyIndex].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const clipboardData = e.clipboardData.getData("text");
        const pastedOtp = clipboardData.slice(0, arrayLength).split("");
        const sanitizedOtp = pastedOtp.map((char) => (isNaN(char) ? "" : char));

        setOtp((prevOtp) => {
            const newOtp = [...prevOtp];
            for (let i = 0; i < arrayLength; i++) {
                newOtp[i] = sanitizedOtp[i] || "";
            }
            return newOtp;
        });

        const combinedOtp = sanitizedOtp.join("");
        if (combinedOtp.length === arrayLength) {
            setOtpToSubmit(combinedOtp);
        }
    };

    return {
        otp,
        otpToSubmit,
        inputRefs,
        handleChange,
        handleKeyDown,
        handleClick,
        handlePaste,
    };
};
