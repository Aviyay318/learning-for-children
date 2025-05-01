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

export default function Navbar({ deleteCookies, username }) {
    const { user } = useUser();
    const location = useLocation(); // 👈 access the current route
    useSetResponsiveProperty("--navbar-svg-size");

    // 👇 Check if we are currently inside any island page
    const isOnIslandPage = location.pathname.startsWith("/island/") && location.pathname !== "/map";

    return (
        <div className="navbar flex">
            {user && (
                <div className={"navbar-coins-container flex"}>
                    <img className={"navbar-icons coin-icon"} src={coin} alt="Homepage"/>
                    <label className={"coins-label"}>{user.score}</label>
                </div>
            )}

            <NavLink to="/homepage" className={({ isActive }) => isActive ? "active" : ""}>
                <img className={"navbar-icons"} src={homepage} alt="Homepage" />
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                <img className={"navbar-icons profile"} src={profile} alt="Profile" />
            </NavLink>

            <NavLink to={isOnIslandPage ? "/map" : "/map"} className={({ isActive }) => isActive ? "active" : ""}>
                <img
                    className={"navbar-icons play"}
                    src={isOnIslandPage ? map : play}
                    alt={isOnIslandPage ? "Map" : "Play"}
                />
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                <img className={"navbar-icons"} src={settings} alt="Settings" />
            </NavLink>

            <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                <img className={"navbar-icons"} src={statistics} alt="Statistics" />
            </NavLink>

            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
                <img className={"navbar-icons"} src={logout} alt="Logout" />
            </NavLink>
        </div>
    );
}
