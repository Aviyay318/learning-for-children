
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/register/Register.jsx";
import Homepage from "./pages/homePage/Homepage.jsx";
import Content from "./pages/content/Content.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Login from "./pages/login/Login.jsx";
import {useEffect, useState} from "react";
import useSetResponsiveProperty from "./hooks/responsiveHooks/useSetResponsiveProperty.js";
import Cookies from "js-cookie";
import Navbar from "./components/Navbar/Navbar.jsx";
import axios from "axios";
import {SERVER_URL} from "./utils/Constants.js";


function App() {
    useSetResponsiveProperty("--component-width")
    const [isLogin, setIsLogin] = useState(false);
    const [token,setToken] = useState(null);
    const [username,setUsername]=useState("AYRD")
    const setLogin = () => {
        const token = Cookies.get("token");
        setToken(token)
       axios.get(SERVER_URL+"/get-username?token="+token).then(
           response => {
               setUsername(response.data)
               console.log(response.data)
           }
       )
    }
    const deleteCookies = () => {
        Cookies.remove("token");
        setToken(null);
    };

    useEffect(() => {
       setLogin()
    },[username])

    return (
        <div className={"App flex"}>
            <section className={"background"}></section>
            <BrowserRouter>
                {token!==null && <Navbar deleteCookies={deleteCookies} username={username}/> }

                <Routes>
                    <Route path="/" element={<Login setIsLogin={setLogin}/>}/>
                    <Route path="/homePage" element={<Homepage/>}/>
                    <Route path="/content" element={<Content/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
