import { useState, useEffect } from "react";
import "../../styles/Form.css";
import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import { HOME_PAGE, LOGIN_API, REGISTER_PAGE } from "../../utils/Constants.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const Login = ({ setIsLogin }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { data: loginData, error: loginError, sendRequest: sendLoginRequest } = usePostApi(LOGIN_API);
    const navigate = useNavigate();

    useEffect(() => {
        if (loginData?.success) {
            setIsLogin();
            const cookies = new Cookies();
            cookies.set("token", loginData.token, { path: "/" });
            navigate(HOME_PAGE, { state: { isAdmin: loginData.admin } });
        } else if (loginData?.success === false) {
            setErrors((prev) => ({ ...prev, login: "שם משתמש או סיסמה אינם נכונים" }));
        }
        if (loginError) {
            alert(loginError || "Something went wrong.");
        }
    }, [loginData, loginError]);

    useEffect(() => {
        setIsFormValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.password.length >= 6);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, login: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendLoginRequest(formData);
    };

    return (
        <div className="main-container flex">
            <h1 className="form-header glass">התחברות</h1>
            <form className="grid-container login" onSubmit={handleSubmit}>
                <div className="form-input form-margins flex" id={"item-1"}>
                    <div className={`input-wrapper ${formData.email ? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="email">אימייל</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                <div className="form-input form-margins flex">
                    <div className={`input-wrapper ${formData.password? 'has-content' : ''}`}>
                        <label className={"input-placeholder"} htmlFor="password">סיסמה</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>

                </div>
                {errors.login && <label className="input-error">{errors.login}</label>}
                <button className={"form-submit form-margins"} type="submit" disabled={!isFormValid}>התחבר</button>
            </form>
            <button onClick={() => navigate(REGISTER_PAGE)}>אין לך משתמש? לחץ כאן על מנת להירשם</button>
        </div>
    );
};

export default Login;
