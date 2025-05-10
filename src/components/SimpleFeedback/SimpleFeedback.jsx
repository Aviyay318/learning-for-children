import React, { useEffect } from "react";
import "./SimpleFeedback.css";

export default function SimpleFeedback({
                                           message,
                                           color,
                                           autoCloseTime,
                                           onClose,
                                           playConfetti
                                       }) {


    useEffect(() => {
        if (autoCloseTime != null) {
            const timer = setTimeout(onClose, autoCloseTime);
            return () => clearTimeout(timer);
        }
    }, [autoCloseTime, onClose]);

    return (
        <div className="simple-feedback" style={{ borderColor: color, backgroundColor: color }}>
            <span
                className="simple-feedback-message"
                style={{ color: "white" }}
            >
                {message}
            </span>
            {autoCloseTime == null && (
                <button
                    className="simple-feedback-close"
                    onClick={onClose}
                >
                    סגור
                </button>
            )}
        </div>
    );
}
