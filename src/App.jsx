// 📁 src/App.jsx
import './App.css';
import skyBackground from '/src/assets/images/Islands/sky_background.png';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

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

import Navbar           from './components/Navbar/Navbar.jsx';
import LoadingOverlay   from './components/Loading/LoadingOverlay.jsx';

import Cookies          from 'js-cookie';
import { useUser }      from './contexts/UserContext';

function AppContent() {
    const location = useLocation();
    const token    = Cookies.get('token') || null;
    const { user } = useUser();

    // Hide navbar on auth and otp screens
    const hideNavbarPaths = [
        '/',
        '/register',
        '/passwordRecovery',
        '/newPassword',
        '/otp',
    ];


    return (
        <div
            className={`App with-sky`}
            style={{backgroundImage: `url(${skyBackground})`}}
        >
            {token && !hideNavbarPaths.includes(location.pathname) && (
                <Navbar
                    deleteCookies={() => {
                        Cookies.remove('token');
                        window.location.reload();
                    }}
                    username={user.username || 'AYRD'}
                />
            )}

            <Routes>
                <Route path="/"                           element={<Login />} />
                <Route path="/register"                   element={<Register />} />
                <Route path="/homePage"                   element={<Homepage />} />
                <Route path="/content"                    element={<Content />} />
                <Route path="/profile"                    element={<Profile />} />
                <Route path="/statistics"                 element={<Statistics />} />
                <Route path="/settings"                   element={<Settings />} />
                <Route path="/passwordRecovery"           element={<PasswordRecovery />} />
                <Route path="/newPassword"                element={<NewPassword />} />
                <Route path="/map"                        element={<Map />} />
                <Route path="/otp"                        element={<Otp />} />
                <Route
                    path="/island/:islandId/:exerciseName?"
                    element={<IslandPage />}
                />
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
        </div>
    );
}
