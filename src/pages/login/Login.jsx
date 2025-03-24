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
    const { regData, regError, sendRegisterRequest } = usePostApi(LOGIN_API);
    const navigate = useNavigate();

    useEffect(() => {
        if (regData?.success) {
            setIsLogin();
            const cookies = new Cookies();
            cookies.set("token", regData.token, { path: "/" });
            navigate(HOME_PAGE, { state: { isAdmin: regData.admin } });
        } else if (regData?.success === false) {
            setErrors((prev) => ({ ...prev, login: "שם משתמש או סיסמה אינם נכונים" }));
        }
        if (regError) {
            alert(regError || "Something went wrong.");
        }
    }, [regData, regError]);

    useEffect(() => {
        setIsFormValid(formData.email.length > 0 && formData.password.length > 0);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors((prev) => ({ ...prev, login: "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRegisterRequest(formData);
    };

    return (
        <div className="main-container">
            <h1 className="form-header">התחברות</h1>
            <form className="grid-container" onSubmit={handleSubmit}>
                <div className="form-input form-margins flex">
                    <label htmlFor="email">אימייל</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-input form-margins flex">
                    <label htmlFor="password">סיסמה</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                {errors.login && <label className="input-error">{errors.login}</label>}
                <button type="submit" disabled={!isFormValid}>התחבר</button>
            </form>
            <button onClick={() => navigate(REGISTER_PAGE)}>אין לך משתמש? לחץ כאן על מנת להירשם</button>
        </div>
    );
};

export default Login;
