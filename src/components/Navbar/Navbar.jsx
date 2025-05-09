import {NavLink, useLocation, useParams} from "react-router-dom";
import "./Navbar.css";
import useSetResponsiveProperty from "../../hooks/responsiveHooks/useSetResponsiveProperty.js";
import { useUser } from "../../contexts/UserContext.jsx";

import homepage from "/src/assets/images/Navbar/Icons/homepage.png";
import profile from "/src/assets/images/Navbar/Icons/profile.png";
import map from "/src/assets/images/Navbar/Icons/map.png";
import exerciseChooser from "/src/assets/images/Navbar/Icons/exercise_type_chooser.png";
import settings from "/src/assets/images/Navbar/Icons/settings.png";
import statistics from "/src/assets/images/Navbar/Icons/statistics.png";
import coin from "/src/assets/images/Navbar/Icons/coin.png";
import logout from "/src/assets/images/Navbar/Icons/logout.png";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../utils/Constants.js";
import axios from "axios";
import {useEffect} from "react";

export default function Navbar({ deleteCookies }) {
    const { user, setUser } = useUser();
    useSetResponsiveProperty("--navbar-svg-size");

    const { pathname } = useLocation();

    const segments = pathname.split("/").filter(Boolean);

    // default to the map button
    let middleIcon   = map;
    let middleLinkTo = "/map";
    let middleAlt    = "Map";

    // if URL is at least "/island/:id/:anything"
    if (segments[0] === "island" && segments.length >= 3) {
        middleIcon   = exerciseChooser;
        middleLinkTo = `/island/${segments[1]}`;
        middleAlt    = "Choose Exercise";
    }

    useEffect(() => {
        console.log(pathname)
    },[pathname])

    // const isOnIslandPage = location.pathname.startsWith("/island/") && location.pathname !== "/map";



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
                <img className="clickable navbar-icons" src={homepage} alt="Homepage" />
            </NavLink>

            <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="clickable navbar-icons profile" src={profile} alt="Profile" />
            </NavLink>

            <NavLink to={middleLinkTo} className={({ isActive }) => isActive ? "active" : ""}>
                <img
                    className="clickable navbar-icons play"
                    src={middleIcon}
                    alt={middleAlt}
                />
            </NavLink>

            <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="clickable navbar-icons" src={settings} alt="Settings" />
            </NavLink>

            <NavLink to="/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                <img className="clickable navbar-icons" src={statistics} alt="Statistics" />
            </NavLink>

            {username && (
                <label className="navbar-text">{username}</label>
            )}
            <NavLink to="/" onClick={logoutFunction} className={({ isActive }) => isActive ? "active" : ""}>
                <img className="clickable navbar-icons" src={logout} alt="Logout" />
            </NavLink>

        </div>
    );
}
