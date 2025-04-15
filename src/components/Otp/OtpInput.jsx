// src/components/Otp/OtpInput.jsx
import { forwardRef } from "react";
import "./Otp.css";

const OtpInput = forwardRef(
    ({ index, value, onChange, onKeyDown, onClick, onPaste }, ref) => (
        <input
            ref={ref}
            type="text"
            value={value}
            maxLength={1}
            className="otp-input"
            required
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            onClick={() => onClick(index)}
            onPaste={onPaste}
            placeholder={" "}
        />
    )
);

export default OtpInput;
