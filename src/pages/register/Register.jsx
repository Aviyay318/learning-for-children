import { useState, useEffect } from "react";
import "../../styles/Form.css"
import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import { REGISTER_PAGE} from "../../utils/Constants.js";

const Register = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        confirmEmail: '',
        age: '',
        gender: '',
        password: '',
        confirmPassword: '',
    });
    const { data, error, loading, sendRequest } = usePostApi(REGISTER_PAGE);

    const handleRegisterResponse = async () => {
        await sendRequest(formData)
    };
    useEffect(() => {
        if (data?.success) {
          //TODO כאן רם תוכל לעשות את המעבר לOTP
        }else if(data?.success===false) {
            alert("ישש")
        }
        if (error) {
            alert(error || "Something went wrong.");
        }


    }, [data]);
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        const newErrors = { ...errors };


        if (name === 'firstname') {
            if (value.length < 2) {
                newErrors.firstname = 'שם פרטי צריך להכיל לפחות 2 תווים.';
            } else {
                delete newErrors.firstname;
            }
        }

        if (name === 'lastname') {
            if (value.length < 2) {
                newErrors.lastname = 'שם משפחה צריך להכיל לפחות 2 תווים.';
            } else {
                delete newErrors.lastname;
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

        if (name === 'confirmEmail') {
            if (value !== formData.email) {
                newErrors.confirmEmail = 'כתובות האימייל אינן תואמות.';
            } else {
                delete newErrors.confirmEmail;
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
            formData.firstname.length >= 2 &&
            formData.lastname.length >= 2 &&
            formData.username.length >= 5 &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
            formData.confirmEmail === formData.email &&
            formData.password.length >= 6 &&
            /\d/.test(formData.password) &&
            formData.confirmPassword === formData.password &&
            formData.age;

        setIsFormValid(!!isValid);
    }, [errors, formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        alert('ההרשמה הצליחה!');
    };

    return (
        <div className="main-container">
            <h1 className="form-header">הירשמות</h1>
            <form className={"grid-container"} onSubmit={handleSubmit}>
                <div className="form-input form-margins flex" id={"item-1"}>
                    <div className={`input-wrapper ${formData.firstname ? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="firstname">שם פרטי</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.firstname && <label className={"input-error"}>{errors.firstname}</label>}
                </div>

                <div className="form-input form-margins flex lastname-container" id={"item-2"}>
                    <div className={`input-wrapper ${formData.lastname ? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="lastname">שם משפחה</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.lastname && <label className={"input-error"}>{errors.lastname}</label>}
                </div>

                <div className="form-input form-margins flex username-container" id={"item-3"}>
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

                <div className="form-input form-margins flex email-container" id={"item-4"}>
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

                <div className="form-input form-margins flex confirmEmail-container" id={"item-5"}>
                    <div className={`input-wrapper ${formData.confirmEmail ? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="confirmEmail">וידוא אימייל</label>
                        <input
                            type="email"
                            id="confirmEmail"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.confirmEmail && <label className={"input-error"}>{errors.confirmEmail}</label>}
                </div>

                <div className="form-input form-margins flex age-container" id={"item-6"}>
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
                <div className="form-input form-margins flex gender-container" id={"item-6"}>
                    <div className={`input-wrapper ${formData.age ? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="gender">מגדר</label>
                        <input
                            type="radio"
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        />
                    </div>
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


            </form>
            <button onClick={handleRegisterResponse} className={"form-submit form-margins"} type="submit" disabled={!isFormValid}>
                הרשם
            </button>
        </div>
    );
};

export default Register;


