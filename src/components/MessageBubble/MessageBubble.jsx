// 📁 src/components/MessageBubble/MessageBubble.jsx
import React, { useState, useEffect } from "react";
import "./MessageBubble.css";

export default function MessageBubble({
                                          message,
                                          position = {},
                                          scale,
                                          type,
                                          duration,         // NEW: number of seconds before auto‑dismiss
                                      }) {
    const { top, right, bottom, left } = position;
    const [visible, setVisible] = useState(true);

    // If a duration is provided, auto-hide after `duration` seconds
    useEffect(() => {
        if (duration != null) {
            const timer = setTimeout(() => setVisible(false), duration * 1000);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    if (!visible) return null;

    const style = {
        ...(top    !== undefined && { top }),
        ...(right  !== undefined && { right }),
        ...(bottom !== undefined && { bottom }),
        ...(left   !== undefined && { left }),
        transform: scale ? `scale(${scale})` : undefined,  // use proper CSS transform
    };

    return (
        <div className="message-bubble" id={type} style={style}>
            <span>{message}</span>
        </div>
    );
}
