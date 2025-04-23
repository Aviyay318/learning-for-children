import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const FormField = ({ id, label, type, name, value, error, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="form-input form-margins flex" id={id}>
            <div className={`input-wrapper ${value ? "has-content" : ""}`}>
                <label className="input-placeholder" htmlFor={name}>{label}</label>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                        className="input-field"
                        type={type === "password" && showPassword ? "text" : type}
                        id={name}
                        name={name}
                        value={value}
                        onChange={onChange}
                    />
                    {type === "password" && (
                        <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            aria-label="toggle password visibility"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    )}
                </div>
            </div>
            {error && <label className="input-error">{error}</label>}
        </div>
    );
};

export default FormField;
