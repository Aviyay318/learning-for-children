// 📁 components/Navbar/NavbarAdmin.jsx
import {NavLink} from "react-router-dom";
import homepage from "../../assets/images/Navbar/Icons/homepage.png";
import profile from "../../assets/images/Navbar/Icons/profile.png";

const NavbarAdmin = ({ deleteCookies, username }) => {
    return (
        <nav className="navbar admin-navbar">
            <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
                משתמשים
            </NavLink>
            <NavLink to="/admin/statistics" className={({ isActive }) => isActive ? "active" : ""}>
                סטטיסטיקה כללית
            </NavLink>


        </nav>
    );
};

export default NavbarAdmin;
