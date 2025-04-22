import {NavLink} from "react-router-dom";
import "./Navbar.css"
import useSetResponsiveProperty from "../../hooks/responsiveHooks/useSetResponsiveProperty.js";
import {useUser} from "../../contexts/UserContext.jsx";

import homepage from "/src/assets/images/Navbar/Icons/homepage.png";
import profile from "/src/assets/images/Navbar/Icons/profile.png";
import play from "/src/assets/images/Navbar/Icons/play.png";
import settings from "/src/assets/images/Navbar/Icons/settings.png";
import statistics from "/src/assets/images/Navbar/Icons/statistics.png";
import coin from "/src/assets/images/Navbar/Icons/coin.png";
import logout from "/src/assets/images/Navbar/Icons/logout.png";


export default function Navbar({deleteCookies,username}) {
    const {user} = useUser();
    useSetResponsiveProperty("--navbar-svg-size")

    return (
        <div className={"navbar flex"}>
            <div className={"nav-middle flex"}>
                {user &&
                    <div className={"navbar-coins-container flex"}>
                        <img className={"navbar-icons"} src={coin} alt="Homepage"/>
                        <label className={"coins-label"}>{user.score}</label>
                    </div>}
                <NavLink to="/homepage" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={homepage} alt="Homepage"/>
                </NavLink>
                <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons profile"} src={profile} alt="Profile"/>
                </NavLink>
                <NavLink to="/map" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons play"} src={play} alt="Play"/>
                </NavLink>
                <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={settings} alt="Play"/>
                </NavLink>
                <NavLink to="/statistics" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={statistics} alt="Play"/>

                </NavLink>

            </div>
            <div className={"nav-right flex glass"}>
                <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={logout} alt="Play"/>
                </NavLink>
                <label className={"navbar-text"}>יציאה</label>
            </div>
        </div>

    )
}