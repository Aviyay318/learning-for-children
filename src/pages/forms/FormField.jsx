
const FormField = ({ id, label, type = "text", name, value, error, onChange }) => {
    return (
        <div className="form-input form-margins flex" id={id}>
            <div className={`input-wrapper ${value ? "has-content" : ""}`}>
                <label className="input-placeholder" htmlFor={name}>{label}</label>
                <input
                    className="input-field"
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
            </div>
            {error && <label className="input-error">{error}</label>}
        </div>
    );
};

export default FormField;
