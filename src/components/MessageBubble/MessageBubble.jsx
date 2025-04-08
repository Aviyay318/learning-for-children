// MessageBubble.jsx
import React from "react";
import "./MessageBubble.css";

export default function MessageBubble({ message }) {
    return (
        <div className="message-bubble">
            <span>{message}</span>
        </div>
    );
}