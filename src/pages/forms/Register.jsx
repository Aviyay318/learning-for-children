import {useEffect, useState} from "react";
import "../../styles/Form.css";
import useApi from "../../hooks/apiHooks/useApi";
import { CHECK_OTP, EMAIL_ALREADY_EXISTS, LOGIN_URL, REGISTER_PAGE } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Otp from "../../components/Otp/Otp";
import MessageBubble from "../../components/MessageBubble/MessageBubble";
import FormField from "./FormField";
import { useForm } from "../../hooks/formHooks/useForm";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator";
import LoadingOverlay from "../../components/Loading/LoadingOverlay.jsx";

const Register = () => {
    const navigate = useNavigate();
    const [isOtpIncorrect, setIsOtpIncorrect] = useState("");
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
        password: (v) =>
            v.length < 6
                ? "הסיסמא צריכה להיות באורך של לפחות 6 תווים."
                : "",
        confirmPassword: (v, data) =>
            v !== data.password ? "הסיסמאות אינן תואמות." : "",
    };

    const { formData, handleChange, setField } = useForm(initialValues);
    const { errors, isValid, validateField, validateAll, setErrors, shouldDisable } = useFormValidator(formData, validationRules);
    const { data: regData, error: regError, sendRequest: sendRegisterRequest } = useApi(REGISTER_PAGE, "POST");
    const { data: otpData, error: otpError, sendRequest: sendOtpRequest } = useApi(CHECK_OTP, "POST");

    const showOtp = regData?.success;
    const emailAlreadyExists = regData?.errorCode === EMAIL_ALREADY_EXISTS;

    useEffect(() => {
        console.log(otpData);

        if (otpData?.success && otpData.registeredSuccessfully) {
            console.log("success");
            setIsOtpIncorrect(false);
            navigate(LOGIN_URL);
            // window.location.reload();
        } else if (otpData?.success === false || otpError) {
            setIsOtpIncorrect(true);
        }
    }, [otpData, otpError, navigate]);

    const onOtpSubmit = async (otp) => {
        await sendOtpRequest({ email: formData.email, otp });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateAll();
        if (Object.keys(validation).length === 0 && formData.age && formData.gender) {
            await sendRegisterRequest(formData);
        } else {
            if (!formData.age) validation.age = "יש להזין גיל";
            if (!formData.gender) validation.gender = "יש לבחור דמות";
            setErrors(validation);
        }
    };

    const handleCharacterSelect = (gender) => {
        setField("gender", gender);
    };

    return (
        <div className="main-container form-main-container flex">
            {emailAlreadyExists && <MessageBubble message="האימייל כבר קיים!" />}
            {isOtpIncorrect && <MessageBubble message="זה לא הקוד הנכון, נסה שוב!" />}
            <img className={"form-image"} src={"src/assets/images/FormBackgrounds/login.png"} alt={"login-bg"}/>
            <div className="form" id={"form-register"}>
                <h1 className="form-title">הירשמות</h1>
                {!showOtp ? (
                    <form className="grid-container" onSubmit={handleSubmit}>
                        <FormField id="item-1" name="lastName" label="שם משפחה" value={formData.lastName} onChange={(e) => { handleChange(e); validateField("lastName", e.target.value); }} error={errors.lastName} />
                        <FormField id="item-2" name="firstName" label="שם פרטי" value={formData.firstName} onChange={(e) => { handleChange(e); validateField("firstName", e.target.value); }} error={errors.firstName} />
                        <FormField id="item-4" name="email" label="אימייל" type="email" value={formData.email} onChange={(e) => { handleChange(e); validateField("email", e.target.value); }} error={errors.email} />
                        <FormField id="item-5" name="username" label="שם משתמש" value={formData.username} onChange={(e) => { handleChange(e); validateField("username", e.target.value); }} error={errors.username} />
                        <FormField id="item-6" name="password" label="סיסמא" type="password" value={formData.password} onChange={(e) => { handleChange(e); validateField("password", e.target.value); }} error={errors.password} />
                        <FormField id="item-3" name="age" label="גיל" type="number" value={formData.age} onChange={handleChange} error={errors.age} />
                        <FormField id="item-7" name="confirmPassword" label="וידוא סיסמא" type="password" value={formData.confirmPassword} onChange={(e) => { handleChange(e); validateField("confirmPassword", e.target.value); }} error={errors.confirmPassword} />

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

                        <button className="form-submit form-margins" type="submit" disabled={shouldDisable} id="grid-item-9">
                            הרשם
                        </button>
                    </form>
                ) : (
                    <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} username={formData.username} />
                )}
            </div>
        </div>
    );
};

export default Register;
