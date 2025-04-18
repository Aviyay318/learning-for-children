import {NavLink} from "react-router-dom";
import "./Navbar.css"
import useSetResponsiveProperty from "../../hooks/responsiveHooks/useSetResponsiveProperty.js";
import {useUser} from "../../contexts/UserContext.jsx";

const icons = {
    homepage: "src/assets/images/Navbar/Icons/homepage.png",
    profile: "src/assets/images/Navbar/Icons/profile.png",
    play: "src/assets/images/Navbar/Icons/play.png",
    settings: "src/assets/images/Navbar/Icons/settings.png",
    statistics: "src/assets/images/Navbar/Icons/statistics.png",
    coin: "src/assets/images/Navbar/Icons/coin.png",
    logout: "src/assets/images/Navbar/Icons/logout.png"
}

export default function Navbar({deleteCookies,username}) {
    const {user} = useUser();
    useSetResponsiveProperty("--navbar-svg-size")

    return (
        <div className={"navbar flex"}>
            <div className={"nav-middle flex"}>
                {user &&
                    <div className={"navbar-coins-container flex"}>
                        <img className={"navbar-icons"} src={icons.coin} alt="Homepage"/>
                        <label className={"coins-label"}>300</label>
                    </div>}
                <NavLink to="/homepage" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={icons.homepage} alt="Homepage"/>
                </NavLink>
                <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons profile"} src={icons.profile} alt="Profile"/>
                </NavLink>
                <NavLink to="/map" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons play"} src={icons.play} alt="Play"/>
                </NavLink>
                <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={icons.settings} alt="Play"/>
                </NavLink>
                <NavLink to="/statistics" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={icons.statistics} alt="Play"/>

                </NavLink>

            </div>
            <div className={"nav-right flex glass"}>
                <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
                    <img className={"navbar-icons"} src={icons.logout} alt="Play"/>
                </NavLink>
                <label className={"navbar-text"}>יציאה</label>
            </div>
        </div>

    )
}