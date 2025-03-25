import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Homepage from "./pages/homePage/Homepage.jsx";
import Content from "./pages/content/Content.jsx";
import Profile from "./pages/profile/Profile.jsx";
import Statistics from "./pages/statistics/Statistics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useUser } from "./contexts/UserContext";

function AppContent() {
    const location = useLocation();
    const hideNavbarPaths = ["/", "/register"];
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
            </Routes>
        </>
    );
}

function App() {
    return (
        <div className="App flex">
            <BrowserRouter>
                <AppContent />
            </BrowserRouter>
        </div>
    );
}

export default App;
