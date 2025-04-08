import { useState, useEffect } from "react";
import "../../styles/Form.css";
import "./Login.css"
import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import {HOME_PAGE, LOGIN_API, PASSWORD_RECOVERY, REGISTER_PAGE, SERVER_URL} from "../../utils/Constants.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import { useUser } from "../../contexts/UserContext.jsx";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    const { data: loginData, error: loginError, sendRequest: sendLoginRequest } = usePostApi(LOGIN_API);
    const navigate = useNavigate();
    const { setUser } = useUser();

    useEffect(() => {
        if (loginData?.success) {
            const cookies = new Cookies();
            cookies.set("token", loginData.token, { path: "/" });
            // Fetch the complete user information after login
            axios
                .get(`${SERVER_URL}/get-user-data?token=${loginData.token}`)
                .then(response => {
                    setUser(response.data); // Update global user state with the fetched data
                    navigate(HOME_PAGE, { state: { isAdmin: loginData.admin } });
                })
                .catch(err => {
                    console.error("Error fetching user data:", err);
                    alert("Error fetching user data");
                });
        } else if (loginData?.success === false) {
            setErrors((prev) => ({ ...prev, login: "שם משתמש או סיסמה אינם נכונים" }));
        }
        if (loginError) {
            alert(loginError || "Something went wrong.");
        }
    }, [loginData, loginError, navigate, setUser]);

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

    const passwordRecovery=()=>{
        navigate(PASSWORD_RECOVERY);
    }

    return (
        <div className="main-container form-main-container flex">
            <img className={"form-image"} src={"src/assets/images/login/login.png"}/>
            <form className="form" id={"form-login"} onSubmit={handleSubmit}>
                <h1 className="form-title">התחברות</h1>
                <div className="form-input form-margins flex" id="item-1">
                    <div className={`input-wrapper ${formData.email ? "has-content" : ""}`}>
                        <label className="input-placeholder" htmlFor="email">אימייל</label>
                        <input
                            className={"input-field"}
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="form-input form-margins flex">
                    <div className={`input-wrapper ${formData.password ? "has-content" : ""}`}>
                        <label className="input-placeholder" htmlFor="password">סיסמה</label>
                        <input
                            className={"input-field"}
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                {errors.login && <label className="input-error">{errors.login}</label>}
                <button className="form-submit form-margins" type="submit" disabled={!isFormValid}>התחבר</button>

                <div className={"new-account flex"}>
                    <label className={"label-button"} onClick={passwordRecovery}>שכחת סיסמא?</label>
                    <label>אין לך משתמש? על מנת להירשם
                        {" "}
                        <label className={"label-button"} onClick={() => navigate(REGISTER_PAGE)}>לחץ כאן</label>
                    </label>

                </div>
            </form>

        </div>
    );
};

export default Login;
