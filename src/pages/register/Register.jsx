import { useState, useEffect } from "react";
import "../../styles/Form.css"
import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import {CHECK_OTP, LOGIN_URL, REGISTER_PAGE} from "../../utils/Constants.js";
import {useNavigate} from "react-router-dom";
import Otp from "../../components/Otp/Otp.jsx";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        age: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });
    const { data: regData, error: regError, loading: regLoading, sendRequest: sendRegisterRequest } = usePostApi(REGISTER_PAGE);
    const { data: otpData, error: otpError, loading: otpLoading, sendRequest: sendOtpRequest } = usePostApi(CHECK_OTP);
    const [showOtp, setShowOtp] = useState(false);
    const navigate=useNavigate();


    useEffect(() => {
        if (regData?.success) {
            setShowOtp(true)
        }else if(regData?.success===false) {
            alert("Registration failed. Please try again.")
        }
        if (regError) {
            alert(regError || "Something went wrong during registration.");
        }


    }, [regData,regError]);
    useEffect(() => {
        if(otpData){
            if (otpData.success && otpData.registeredSuccessfuly) {
                setTimeout(()=>{
                    setShowOtp(false)
                    navigate(LOGIN_URL)
                    window.location.reload();
                },5000);
            } else if (otpData.success === false) {
                alert("OTP is incorrect, please try again.");
            }
        }
        if (otpError){
            alert(otpError);
        }
    }, [otpData,otpError,navigate]);

    const onOtpSubmit =async (otp) => {
        console.log("onOtpSubmit called with:", otp);
        await sendOtpRequest({email: formData.email, otp});
        navigate("/")

    }

    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(value)
        setFormData({
            ...formData,
            [name]: value,
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };


        if (name === 'firstName') {
            if (value.length < 2) {
                newErrors.firstName = 'שם פרטי צריך להכיל לפחות 2 תווים.';
            } else {
                delete newErrors.firstName;
            }
        }

        if (name === 'lastName') {
            if (value.length < 2) {
                newErrors.lastName = 'שם משפחה צריך להכיל לפחות 2 תווים.';
            } else {
                delete newErrors.lastName;
            }
        }

        if (name === 'username') {
            if (value.length < 5) {
                newErrors.username = 'שם המשתמש צריך להכיל לפחות 5 תווים.';
            } else {
                delete newErrors.username;
            }
        }

        if (name === 'email') {
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                newErrors.email = 'האימייל צריך להיות בפורמט תקין (לדוגמה: example@domain.com).';
            } else {
                delete newErrors.email;
            }
        }

        if (name === 'password') {
            if (value.length < 6) {
                newErrors.password = 'הסיסמא צריכה להיות באורך של לפחות 6 תווים.';
            } else if (!/\d/.test(value)) {
                newErrors.password = 'הסיסמא צריכה להכיל לפחות ספרה אחת.';
            } else {
                delete newErrors.password;
            }
        }

        if (name === 'confirmPassword') {
            if (value !== formData.password) {
                newErrors.confirmPassword = 'הסיסמאות אינן תואמות.';
            } else {
                delete newErrors.confirmPassword;
            }
        }

        setErrors(newErrors);
    };

    useEffect(() => {

        const isValid =
            !Object.keys(errors).length &&
            formData.firstName.length >= 2 &&
            formData.lastName.length >= 2 &&
            formData.username.length >= 5 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            // formData.confirmEmail === formData.email &&
            formData.password.length >= 6 &&
            /\d/.test(formData.password) &&
            formData.confirmPassword === formData.password &&
            formData.age;

        setIsFormValid(!isValid);
    }, [errors, formData]);

    const handleSubmit =async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        await sendRegisterRequest(formData)
    };
    return (
        <div className="main-container flex">
            <h1 className="form-header glass">הירשמות</h1>
            {
                !showOtp ? (
                    <form className={"grid-container"} onSubmit={handleSubmit}>
                        <div className="form-input form-margins flex" id={"item-1"}>
                            <div className={`input-wrapper ${formData.firstName ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="firstName">שם פרטי</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.firstName && <label className={"input-error"}>{errors.firstName}</label>}
                        </div>

                        <div className="form-input form-margins flex lastname-container" id={"item-2"}>
                            <div className={`input-wrapper ${formData.lastName ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="lastName">שם משפחה</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.lastName && <label className={"input-error"}>{errors.lastName}</label>}
                        </div>

                        <div className="form-input form-margins flex age-container" id={"item-3"}>
                            <div className={`input-wrapper ${formData.age ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="age">גיל</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    onKeyDown={(e) => {
                                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
                                            e.preventDefault(); // Block non-numeric characters
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-input form-margins flex gender-container" id={"item-4"}>
                            <label className={"input-placeholder"} htmlFor="gender">מגדר</label>
                            <div className={"gender-chooser flex"}>
                                <label className={"flex"}>
                                    <input
                                        type="radio"
                                        id="gender-male"
                                        name="gender"
                                        value={"boy"}
                                        onChange={handleChange}
                                    />
                                    <img src={"src/assets/profile-pictures/boy1.jpg"} style={{width: "50px", height: "50px"}}/>
                                </label>
                                <label className={"flex"}>
                                    <input
                                        type="radio"
                                        id="gender-female"
                                        name="gender"
                                        value={"girl"}
                                        onChange={handleChange}
                                    />
                                    <img src={"src/assets/profile-pictures/girl1.jpg"} style={{width: "50px", height: "50px"}}/>
                                </label>
                            </div>
                        </div>

                        <div className="form-input form-margins flex username-container" id={"item-5"}>
                            <div className={`input-wrapper ${formData.username ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="username">שם משתמש</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.username && <label className={"input-error"}>{errors.username}</label>}
                        </div>

                        <div className="form-input form-margins flex email-container" id={"item-6"}>
                            <div className={`input-wrapper ${formData.email ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="email">אימייל</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && <label className={"input-error"}>{errors.email}</label>}
                        </div>

                        <div className="form-input form-margins flex confirmPass-container" id={"item-8"}>
                            <div className={`input-wrapper ${formData.confirmPassword ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="confirmPassword">וידוא סיסמא</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.confirmPassword && <label className={"input-error"}>{errors.confirmPassword}</label>}
                        </div>

                        <div className="form-input form-margins flex password-container" id={"item-7"}>
                            <div className={`input-wrapper ${formData.password ? 'has-content' : ''}`}>
                                <label className={"input-placeholder"} htmlFor="password">סיסמא</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.password && <label className={"input-error"}>{errors.password}</label>}
                        </div>


                        <button className={"form-submit form-margins"} type="submit" disabled={isFormValid} id={"grid-item-9"}>
                            הרשם
                        </button>
                    </form>
            ):
                <Otp arrayLength={6} onOtpSubmit={onOtpSubmit} username={formData.username}/>
            }
            {/*<Otp arrayLength={6} onOtpSubmit={onOtpSubmit} username={formData.username}/>*/}

        </div>
    );
};

export default Register;


