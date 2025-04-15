import { useState } from "react";

export function useBubbleError() {
    const [bubbleMessage, setBubbleMessage] = useState(null);
    const [lockButton, setLockButton] = useState(false);

    const showError = (message) => {
        setBubbleMessage(message);
        setLockButton(true);
    };

    const clearError = () => {
        setBubbleMessage(null);
        setLockButton(false);
    };

    return {
        bubbleMessage,
        lockButton,
        showError,
        clearError,
    };
}
