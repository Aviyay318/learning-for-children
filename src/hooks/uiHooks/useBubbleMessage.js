import { useState } from "react";

export const bubbleTypes = ["confirmation", "warning", "error", "info"];

export function useBubbleMessage() {
    const [bubbleMessage, setBubbleMessage] = useState(null);
    const [bubbleType, setBubbleType] = useState("");
    const [lockButton, setLockButton] = useState(false);

    const showMessage = (message) => {
        setBubbleMessage(message);
        setLockButton(true);
    };
    const handleBubbleType = (type) => {
        setBubbleType(type);
    }
    const clearError = () => {
        setBubbleMessage(null);
        setLockButton(false);
    };

    return {
        bubbleMessage,
        lockButton,
        showMessage,
        clearError,
        bubbleType,
        handleBubbleType
    };
}
