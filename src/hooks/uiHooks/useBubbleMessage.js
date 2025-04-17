import { useState } from "react";

export function useBubbleMessage() {
    const [bubbleMessage, setBubbleMessage] = useState(null);
    const [lockButton, setLockButton] = useState(false);

    const showMessage = (message) => {
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
        showMessage,
        clearError,
    };
}
