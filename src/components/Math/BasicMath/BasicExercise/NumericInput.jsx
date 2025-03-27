import React from "react";
import "./BasicExercise.css";

const NumericInput = ({ value, onChange, inputKey }) => {
    // onKeyDown to block any non-digit key (except allowed control keys)
    const handleKeyDown = (e) => {
        const allowedKeys = [
            "Backspace",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
            "Tab",
            "Home",
            "End"
        ];
        if (allowedKeys.includes(e.key)) return;

        // Only allow digits
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    };

    // onChange ensures that only numeric content gets through
    const handleChange = (e) => {
        const val = e.target.value;
        // Allow empty string so user can delete everything
        if (val === "" || /^\d+$/.test(val)) {
            // Update state: if empty, pass empty string; otherwise convert to number
            onChange(val === "" ? "" : Number(val));
        }
        // Otherwise, do nothing (state remains unchanged)
    };

    return (
        <input
            key={inputKey}
            type="text"             // using text for better control
            inputMode="numeric"     // hints mobile browsers to show numeric keyboard
            pattern="[0-9]*"        // basic pattern restriction (mostly advisory)
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="basic-exercise-input"
        />
    );
};

export default NumericInput;
