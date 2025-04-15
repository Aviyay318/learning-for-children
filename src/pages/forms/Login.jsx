import { useEffect } from "react";
import "../../styles/Form.css";
import useApi from "../../hooks/apiHooks/useApi";
import { HOME_PAGE, LOGIN_API, PASSWORD_RECOVERY, REGISTER_PAGE } from "../../utils/Constants";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useUser } from "../../contexts/UserContext";
import { useForm } from "../../hooks/formHooks/useForm";
import { useFormValidator } from "../../hooks/formHooks/useFormValidator";
import FormField from "./FormField";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useUser();

    const initialValues = {
        email: "",
        password: "",
    };

    const validationRules = {
        email: (v) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "כתובת אימייל לא תקינה" : "",
        password: (v) => v.length < 6 ? "הסיסמא צריכה להיות לפחות 6 תווים" : "",
    };

    const { formData, handleChange } = useForm(initialValues);
    const {
        errors,
        validateField,
        validateAll,
        setErrors,
        touched,
        shouldDisable
    } = useFormValidator(formData, validationRules);

    const { data: loginData, error: loginError, sendRequest: sendLoginRequest } = useApi(LOGIN_API, "POST");
    const { data: userData, error: userError, sendRequest: fetchUser } = useApi("/get-user-data", "GET");

    useEffect(() => {
        const cookies = new Cookies();

        if (loginData?.success) {
            cookies.set("token", loginData.token, { path: "/" });
            fetchUser({ token: loginData.token });
        } else if (loginData?.success === false) {
            setErrors({ login: "שם משתמש או סיסמה אינם נכונים" });
        }

        if (loginError) {
            alert(loginError || "Something went wrong.");
        }
    }, [loginData, loginError, setErrors]);

    useEffect(() => {
        if (userData) {
            setUser(userData);
            navigate(HOME_PAGE, { state: { isAdmin: loginData.admin } });
        }

        if (userError) {
            console.error("Error fetching user data:", userError);
            alert("Error fetching user data");
        }
    }, [userData, userError, setUser, navigate, loginData?.admin]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validation = validateAll();
        if (Object.keys(validation).length === 0) {
            await sendLoginRequest(formData);
        }
    };

    return (
        <div className="main-container form-main-container flex">
            <img className={"form-image"} src={"src/assets/images/FormBackgrounds/login.png"} />
            <form className="form" id={"form-login"} onSubmit={handleSubmit}>
                <h1 className="form-title">התחברות</h1>

                <FormField
                    id="item-1"
                    name="email"
                    label="אימייל"
                    value={formData.email}
                    onChange={(e) => {
                        handleChange(e);
                        validateField("email", e.target.value);
                    }}
                    error={touched.email && errors.email}
                />

                <FormField
                    name="password"
                    label="סיסמה"
                    type="password"
                    value={formData.password}
                    onChange={(e) => {
                        handleChange(e);
                        validateField("password", e.target.value);
                    }}
                    error={touched.password && errors.password}
                />

                {errors.login && <label className="input-error">{errors.login}</label>}

                <button className="form-submit form-margins" type="submit" disabled={shouldDisable}>
                    התחבר
                </button>

                <div className="new-account flex">
                    <label className="label-button" onClick={() => navigate(PASSWORD_RECOVERY)}>שכחת סיסמא?</label>
                    <label>
                        אין לך משתמש? על מנת להירשם{" "}
                        <label className="label-button" onClick={() => navigate(REGISTER_PAGE)}>לחץ כאן</label>
                    </label>
                </div>
            </form>
        </div>
    );
};

export default Login;
