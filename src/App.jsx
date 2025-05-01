import './App.css';
import skyBackground from '/src/assets/images/Islands/sky_background.png';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Login            from './pages/forms/Login.jsx';
import Register         from './pages/forms/Register.jsx';
import Homepage         from './pages/homePage/Homepage.jsx';
import Content          from './pages/content/Content.jsx';
import Profile          from './pages/profile/Profile.jsx';
import Statistics       from './pages/statistics/Statistics.jsx';
import Settings         from './pages/Settings/Settings.jsx';
import PasswordRecovery from './components/PasswordRecovery/PasswordRecovery.jsx';
import NewPassword      from './components/PasswordRecovery/NewPassword.jsx';
import Map              from './pages/Map/Map.jsx';
import Otp              from './components/Otp/Otp.jsx';
import IslandPage       from './pages/IslandPage/IslandPage.jsx';
import Users            from './components/Admin/Users.jsx';

import Navbar           from './components/Navbar/Navbar.jsx';
import LoadingOverlay   from './components/Loading/LoadingOverlay.jsx';
import ProtectedRoute   from './components/ProtectedRoute.jsx';

import Cookies          from 'js-cookie';
import { useUser }      from './contexts/UserContext';
import {publicRoutes} from "./utils/Constants.js";
import NavbarAdmin from "./components/NavbarAdmin/NavbarAdmin.jsx";
import UserInfo from "./components/Admin/UserInfo.jsx";
import StatisticsPage from "./components/Admin/StatisticsPage.jsx";

function AppContent() {
    const location = useLocation();
    const token = Cookies.get('token') || null;
    const { user } = useUser();

    const isPublic = publicRoutes.some(path => location.pathname.startsWith(path));
    const showNavbar = token && user?.isVerified ;
const print=()=>{
    {
        console.log("token:", token);
        console.log("user:", user);
        console.log("showNavbar:", showNavbar);
        console.log("location:", location.pathname);
        console.log("isPublic:", isPublic);

    }
}
    return (
        <div
            className="App with-sky"
            style={{ backgroundImage: `url(${skyBackground})` }}
        >
            {print()}
            {showNavbar && (
                user?.username === 'admin' ? (
                    <NavbarAdmin
                        deleteCookies={() => {
                            Cookies.remove('token');
                            window.location.reload();
                        }}
                        username={user?.username}
                    />
                ) : (
                    <Navbar
                        deleteCookies={() => {
                            Cookies.remove('token');
                            window.location.reload();
                        }}
                        username={user?.username}
                    />
                )
            )}

            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/passwordRecovery" element={<PasswordRecovery />} />
                <Route path="/newPassword" element={<NewPassword />} />
                <Route path="/otp" element={<Otp />} />

                {/* Protected routes */}
                <Route path="/homePage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                <Route path="/content" element={<ProtectedRoute><Content /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/map" element={<ProtectedRoute><Map /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
                <Route path="/user-info/:email" element={<ProtectedRoute><UserInfo /></ProtectedRoute>} />
                <Route path="/admin/statistics"  element={<ProtectedRoute><StatisticsPage/></ProtectedRoute>} />
                <Route path="/island/:islandId/:exerciseName?" element={
                    <ProtectedRoute><IslandPage /></ProtectedRoute>
                } />
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <div className="App flex">
            <BrowserRouter>
                <LoadingOverlay />
                <AppContent />
            </BrowserRouter>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}
