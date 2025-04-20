import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/forms/Login.jsx";
import Register from "./pages/forms/Register.jsx";
import Homepage from "./pages/homePage/Homepage.jsx";
import Content from "./pages/content/Content.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Statistics from "./pages/statistics/Statistics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useUser } from "./contexts/UserContext";
import PasswordRecovery from "./components/PasswordRecovery/PasswordRecovery.jsx"
import NewPassword from "./components/PasswordRecovery/NewPassword.jsx";
import LoadingOverlay from "./components/Loading/LoadingOverlay.jsx";
import Map from "./pages/Map/Map.jsx";
import Otp from "./components/Otp/Otp.jsx";

function AppContent() {
    const location = useLocation();
    const hideNavbarPaths = ["/", "/register","/passwordRecovery" , "/newPassword", "/otp"];
    const token = Cookies.get("token") || null;
    const { user } = useUser();

    return (
        <>
            {token && !hideNavbarPaths.includes(location.pathname) && (
                <Navbar
                    deleteCookies={() => {
                        Cookies.remove("token");
                        window.location.reload();
                    }}
                    username={user.username || "AYRD"}
                />
            )}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/homePage" element={<Homepage />} />
                <Route path="/content" element={<Content />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/passwordRecovery" element={<PasswordRecovery />} />
                <Route path="/newPassword" element={<NewPassword/>} />
                <Route path="/map" element={<Map/>} />
                <Route path="/otp" element={<Otp/>} />
            </Routes>
        </>
    );
}

function App() {
    return (
        <div className="App flex">
            <BrowserRouter>
                <LoadingOverlay/>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;
