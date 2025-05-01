// 📁 components/Navbar/NavbarAdmin.jsx
import "../Navbar/Navbar.css"
import {NavLink} from "react-router-dom";
import homepage from "../../assets/images/Navbar/Icons/homepage.png";
import profile from "../../assets/images/Navbar/Icons/profile.png";
import statistics from "../../assets/images/Navbar/Icons/statistics.png";

const NavbarAdmin = ({ deleteCookies, username }) => {
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


        </nav>
    );
};

export default NavbarAdmin;
