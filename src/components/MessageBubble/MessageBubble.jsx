import React from "react";
import "./MessageBubble.css";

export default function MessageBubble({ message, position = {}, scale, type }) {
    const { top, right, bottom, left } = position;

    const style = {
        ...(top !== undefined && { top }),
        ...(right !== undefined && { right }),
        ...(bottom !== undefined && { bottom }),
        ...(left !== undefined && { left }),
        scale: scale,

    };

    return (
        <div className="message-bubble" id={type} style={style}>
            <span>{message}</span>
        </div>
    );
}
