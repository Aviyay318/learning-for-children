// 📁 components/Navbar/NavbarAdmin.jsx
import "../Navbar/Navbar.css"
import {NavLink} from "react-router-dom";
import homepage from "../../assets/images/Navbar/Icons/homepage.png";
import profile from "../../assets/images/Navbar/Icons/profile.png";
import statistics from "../../assets/images/Navbar/Icons/statistics.png";
import logout from "../../assets/images/Navbar/Icons/logout.png";
import Cookies from "js-cookie";
import axios from "axios";
import {SERVER_URL} from "../../utils/Constants.js";
import {useContext} from "react";
import {UserContext} from "../../contexts/UserContext.jsx";
const NavbarAdmin = ({ deleteCookies, username }) => {
    const {setUser} = useContext(UserContext);

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
    return (
        <nav className="navbar admin-navbar">
            <NavLink to="/users" className={({isActive}) => isActive ? "active" : ""}>
                <img className={"navbar-icons profile"} src={profile} alt="Profile"/>
                {/*משתמשים*/}
            </NavLink>
            <NavLink to="/admin/statistics" className={({isActive}) => isActive ? "active" : ""}>
                <img className={"navbar-icons"} src={statistics} alt="Statistics"/>
                {/*סטטיסטיקה כללית*/}
            </NavLink>
            <NavLink to="/" onClick={logoutFunction} className={({ isActive }) => isActive ? "active" : ""}>
                <img className="navbar-icons" src={logout} alt="Logout" />
            </NavLink>

        </nav>
    );
};

export default NavbarAdmin;
