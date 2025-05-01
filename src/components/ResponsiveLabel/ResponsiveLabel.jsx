// components/ResponsiveLabel/ResponsiveLabel.jsx
import React, { useRef } from "react";
import { useAutoFontSize } from "../../hooks/useAutoFontSize";

export const ResponsiveLabel = ({ children, className = "", maxSize = 100 }) => {
    const labelRef = useRef();
    useAutoFontSize(labelRef, { maxFontSize: maxSize, minFontSize: 10, step: 1 });

    return (
        <label
            ref={labelRef}
            className={`responsive-label ${className}`}
            style={{
                display: "inline-block",
                lineHeight: "1",
                fontWeight: "bold",
            }}
        >
            {children}
        </label>
    );
};
