import {useEffect, useState} from "react";

import usePostApi from "../../hooks/apiHooks/usePostApi.js";
import {HOME_PAGE, LOGIN_API, REGISTER_PAGE} from "../../utils/Constants.js";
import {useNavigate} from "react-router-dom";
import Cookies from 'universal-cookie';



export default function Login({setIsLogin}){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successLoginResponse, setSuccessLoginResponse] = useState(true);
    const navigate = useNavigate();
    const { data, error, loading, sendRequest } = usePostApi(LOGIN_API);


    const handleLoginResponse = async () => {
        await sendRequest({ email, password });
    };

    useEffect(() => {
        if (data?.success) {
            setIsLogin()
            const cookies = new Cookies();
            cookies.set('token', data.token, { path: '/' });
            navigate(HOME_PAGE,{ state: { isAdmin: data.admin} });
        }else if(data?.success===false) {
          setSuccessLoginResponse(false);
        }
        if (error) {
            alert(error || "Something went wrong.");
        }


    }, [data]);



    return(
        <>
            <h1>התחברות:</h1>

            <label>הכנס אימייל:</label>
            <input type="text" name="email" placeholder="אימייל" onChange={(event) => {setEmail(event.target.value);setSuccessLoginResponse(true);}}/>

            <br/>
            <label>הכנס סיסמא:</label>
            <input type="password" name="password" placeholder="סיסמא"
                   onChange={(event) => {setPassword(event.target.value);setSuccessLoginResponse(true);}}/>

            {
                successLoginResponse===false
                && <div>
                    <label style={{color:"red"}}>שם משתמש או סיסמא אינם נכונים</label>
                </div>
            }

            <br/>
            <button disabled={email.length === 0 || password.length === 0 || successLoginResponse === false}
                     onClick={handleLoginResponse}
            >Login
            </button>
            <div>
                <button onClick={() => {
                    navigate(REGISTER_PAGE)
                }}>אין לך משתמש? לחץ כאן על מנת להירשם
                </button>

            </div>
        </>
    )
}