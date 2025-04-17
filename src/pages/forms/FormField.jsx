
const FormField = ({ id, label, type, name,value, error, onChange }) => {
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

{/*<AnimatePresence>*/}
{/*    {success && (*/}
{/*        <motion.div*/}
{/*            initial={{ opacity: 0, scale: 0.8 }}*/}
{/*            animate={{ opacity: 1, scale: 1 }}*/}
{/*            exit={{ opacity: 0 }}*/}
{/*            transition={{ duration: 0.5 }}*/}
{/*            className="success-bubble"*/}
{/*        >*/}
{/*            ✅ הסיסמה עודכנה בהצלחה!*/}
{/*        </motion.div>*/}
{/*    )}*/}
{/*</AnimatePresence>*/}