import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";
import useSetResponsiveProperty from "../../hooks/responsiveHooks/useSetResponsiveProperty.js";
import { useUser } from "../../contexts/UserContext.jsx";

import homepage from "/src/assets/images/Navbar/Icons/homepage.png";
import profile from "/src/assets/images/Navbar/Icons/profile.png";
import play from "/src/assets/images/Navbar/Icons/play.png";
import map from "/src/assets/images/Navbar/Icons/map.png";
import settings from "/src/assets/images/Navbar/Icons/settings.png";
import statistics from "/src/assets/images/Navbar/Icons/statistics.png";
import coin from "/src/assets/images/Navbar/Icons/coin.png";
import logout from "/src/assets/images/Navbar/Icons/logout.png";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../utils/Constants.js";
import axios from "axios";

export default function Navbar({ deleteCookies }) {
    const { user, setUser } = useUser();
    const location = useLocation();
    useSetResponsiveProperty("--navbar-svg-size");

    const isOnIslandPage = location.pathname.startsWith("/island/") && location.pathname !== "/map";

    const logoutFunction = () => {
        const token = Cookies.get('token');
        axios.get(SERVER_URL + "/logout?token=" + token)
            .then(response => {
                if (response.data !== null) {
                    setUser(prev => ({
                        ...prev,
                        isVerified: false
                    }));
                    Cookies.remove('token');
                }
            })
            .catch(err => console.error("Logout failed:", err));
    };

    const score = user?.user?.score ?? 0;
    const username = user?.user?.username ?? "";

    return (
        <div className="navbar flex">
            {user?.user && (
                <div className="navbar-coins-container flex">
                    <img className="navbar-icons coin-icon" src={coin} alt="Coins" />
                    <label className="coins-label">{score}</label>
                </div>
            )}

            <NavLink to="/homepage" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons" src={homepage} alt="Homepage" />
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons profile" src={profile} alt="Profile" />
            </NavLink>

            <NavLink to={isOnIslandPage ? "/map" : "/map"} className={({ isActive }) => isActive ? "active" : ""}>
                <img
                    className="navbar-icons play"
                    src={isOnIslandPage ? map : play}
                    alt={isOnIslandPage ? "Map" : "Play"}
                />
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons" src={settings} alt="Settings" />
            </NavLink>

            <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons" src={statistics} alt="Statistics" />
            </NavLink>

            {username && (
                <label className="navbar-text">{username}</label>
            )}
            <NavLink to="/" onClick={logoutFunction} className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons" src={logout} alt="Logout" />
            </NavLink>

        </div>
    );
}
