import { useEffect, useState } from "react";
import "../../styles/Form.css";
import useApi from "../../hooks/apiHooks/useApi";
import { CHECK_OTP, EMAIL_ALREADY_EXISTS, LOGIN_URL, REGISTER_PAGE } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Otp from "../../components/Otp/Otp.jsx";
import FormField from "./FormField";
import { useForm } from "../../hooks/formHooks/useForm";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator";
import MessageBubble from "../../components/MessageBubble/MessageBubble.jsx";
import { useBubbleError } from "../../hooks/uiHooks/useBubbleError";

const Register = () => {
    const navigate = useNavigate();
    const [showOtp, setShowOtp] = useState(false);

    const { bubbleMessage, lockButton, showMessage, clearError } = useBubbleError();

    const initialValues = {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        age: "",
        gender: "",
        password: "",
        confirmPassword: "",
    };

    const validationRules = {
        firstName: (v) => v.length < 2 ? "שם פרטי צריך להכיל לפחות 2 תווים." : "",
        lastName: (v) => v.length < 2 ? "שם משפחה צריך להכיל לפחות 2 תווים." : "",
        username: (v) => v.length < 5 ? "שם המשתמש צריך להכיל לפחות 5 תווים." : "",
        email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
        password: (v) => v.length < 6 ? "הסיסמא צריכה להיות באורך של לפחות 6 תווים." : "",
        confirmPassword: (v, data) => v !== data.password ? "הסיסמאות אינן תואמות." : "",
    };

    const { formData, handleChange, setField } = useForm(initialValues);
    const { errors, validateField, validateAll, setErrors, shouldDisable } = useFormValidator(formData, validationRules);
    const { sendRequest: sendRegisterRequest } = useApi(REGISTER_PAGE, "POST");
    const { data: otpData, error: otpError, sendRequest: sendOtpRequest } = useApi(CHECK_OTP, "POST");

    useEffect(() => {
        if (otpData?.success && otpData.registeredSuccessfully) {
            navigate(LOGIN_URL);
            window.location.reload();
        } else if (otpData?.success === false || otpError) {
            showMessage("זה לא הקוד הנכון, נסה שוב!");
        }
    }, [otpData, otpError]);

    const onOtpSubmit = async (otp) => {
        await sendOtpRequest({ email: formData.email, otp });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateAll();

        if (Object.keys(validation).length === 0 && formData.age && formData.gender) {
            const response = await sendRegisterRequest(formData);

            if (response?.errorCode === EMAIL_ALREADY_EXISTS) {
                showMessage("האימייל כבר קיים!");
            } else if (response?.success) {
                setShowOtp(true);
            } else {
                showMessage("שגיאה בהרשמה");
            }
        } else {
            const newErrors = { ...validation };
            if (!formData.age) newErrors.age = "יש להזין גיל";
            if (!formData.gender) newErrors.gender = "יש לבחור דמות";
            setErrors(newErrors);
        }
    };

    const handleCharacterSelect = (gender) => {
        setField("gender", gender);
        clearError();
    };

    const wrappedHandleChange = (e) => {
        handleChange(e);
        clearError();
    };

    return (
        <div className="main-container form-main-container flex">
            {bubbleMessage && (
                <MessageBubble
                    message={bubbleMessage}
                    position={{ top: "38%", right: "69%" }}
                    type={"error"}
                />
            )}

            <img className="form-image" src="src/assets/images/FormBackgrounds/register.png" alt="login-bg" />
            <div className="form" id="form-register">
                <h1 className="form-title">הירשמות</h1>
                {!showOtp ? (
                    <form className="grid-container" onSubmit={handleSubmit}>
                        <FormField id="item-1" name="lastName" label="שם משפחה" value={formData.lastName} onChange={(e) => { wrappedHandleChange(e); validateField("lastName", e.target.value); }} error={errors.lastName} />
                        <FormField id="item-2" name="firstName" label="שם פרטי" value={formData.firstName} onChange={(e) => { wrappedHandleChange(e); validateField("firstName", e.target.value); }} error={errors.firstName} />
                        <FormField id="item-4" name="email" label="אימייל" type="email" value={formData.email} onChange={(e) => { wrappedHandleChange(e); validateField("email", e.target.value); }} error={errors.email} />
                        <FormField id="item-5" name="username" label="שם משתמש" value={formData.username} onChange={(e) => { wrappedHandleChange(e); validateField("username", e.target.value); }} error={errors.username} />
                        <FormField id="item-6" name="password" label="סיסמא" type="password" value={formData.password} onChange={(e) => { wrappedHandleChange(e); validateField("password", e.target.value); }} error={errors.password} />
                        <FormField id="item-3" name="age" label="גיל" type="number" value={formData.age} onChange={wrappedHandleChange} error={errors.age} />
                        <FormField id="item-7" name="confirmPassword" label="וידוא סיסמא" type="password" value={formData.confirmPassword} onChange={(e) => { wrappedHandleChange(e); validateField("confirmPassword", e.target.value); }} error={errors.confirmPassword} />

                        <div className="form-input form-margins flex character-select-container" id="grid-item-8">
                            <label className="input-placeholder">בחר/י דמות</label>
                            <div className="gender-chooser input-field flex">
                                <img
                                    src="src/assets/profile-pictures/girl1.jpg"
                                    className={`character-icon ${formData.gender === 'girl' ? 'selected has-content' : ''}`}
                                    onClick={() => handleCharacterSelect('girl')}
                                    alt="Girl Character"
                                />
                                <img
                                    src="src/assets/profile-pictures/boy1.jpg"
                                    className={`character-icon ${formData.gender === 'boy' ? 'selected has-content' : ''}`}
                                    onClick={() => handleCharacterSelect('boy')}
                                    alt="Boy Character"
                                />
                            </div>
                            {errors.gender && <label className="input-error">{errors.gender}</label>}
                        </div>

                        <button className="form-submit form-margins" type="submit" disabled={shouldDisable || lockButton} id="grid-item-9">
                            הרשם
                        </button>
                    </form>
                ) : (
                    <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} />
                )}
            </div>
        </div>
    );
};

export default Register;
