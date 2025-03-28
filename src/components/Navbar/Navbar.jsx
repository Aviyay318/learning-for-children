import {NavLink} from "react-router-dom";
import "./Navbar.css"
import useSetResponsiveProperty from "../../hooks/responsiveHooks/useSetResponsiveProperty.js";
import {useUser} from "../../contexts/UserContext.jsx";
export default function Navbar({deleteCookies,username}) {
    const {user} = useUser();
    useSetResponsiveProperty("--navbar-svg-size")

    return (
        <div className={"navbar flex"}>
            <div className={"nav-left flex glass"}>
                {user.username!==null?<label className={"navbar-text flex"}>{user.username}<br/>{"רמה: " + user.level}</label>:<label>AYRD</label>}
                <NavLink to="/profile" className={({isActive}) => isActive ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="var(--navbar-svg-size)" viewBox="0 -960 960 960" width="var(--navbar-svg-size)"
                         fill="#5f6368">
                        <path
                            d="M360-390q-21 0-35.5-14.5T310-440q0-21 14.5-35.5T360-490q21 0 35.5 14.5T410-440q0 21-14.5 35.5T360-390Zm240 0q-21 0-35.5-14.5T550-440q0-21 14.5-35.5T600-490q21 0 35.5 14.5T650-440q0 21-14.5 35.5T600-390ZM480-160q134 0 227-93t93-227q0-24-3-46.5T786-570q-21 5-42 7.5t-44 2.5q-91 0-172-39T390-708q-32 78-91.5 135.5T160-486v6q0 134 93 227t227 93Zm0 80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-54-715q42 70 114 112.5T700-640q14 0 27-1.5t27-3.5q-42-70-114-112.5T480-800q-14 0-27 1.5t-27 3.5ZM177-581q51-29 89-75t57-103q-51 29-89 75t-57 103Zm249-214Zm-103 36Z"/>
                    </svg>
                </NavLink>
            </div>
            <div className={"nav-middle flex glass"}>
                <NavLink to="/homepage" className={({isActive}) => isActive ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="var(--navbar-svg-size)" viewBox="0 -960 960 960"
                         width="var(--navbar-svg-size)"
                         fill="#5f6368">
                        <path
                            d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                    </svg>
                </NavLink>
                <NavLink to="/content" className={({isActive}) => isActive ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="var(--navbar-svg-size)" viewBox="0 -960 960 960"
                         width="var(--navbar-svg-size)"
                         fill="#5f6368">
                        <path
                            d="M320-240h60v-80h80v-60h-80v-80h-60v80h-80v60h80v80Zm200-30h200v-60H520v60Zm0-100h200v-60H520v60Zm44-152 56-56 56 56 42-42-56-58 56-56-42-42-56 56-56-56-42 42 56 56-56 58 42 42Zm-314-70h200v-60H250v60Zm-50 472q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                    </svg>
                </NavLink>
                <NavLink to="/statistics" className={({isActive}) => isActive ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="var(--navbar-svg-size)" viewBox="0 -960 960 960" width="var(--navbar-svg-size)" fill="#5f6368">
                        <path d="M520-520h278q-15-110-91.5-186.5T520-798v278Zm-80 358v-636q-121 15-200.5 105.5T160-480q0 122 79.5 212.5T440-162Zm80 0q110-14 187-91t91-187H520v278Zm-40-318Zm0 400q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155T763-197.5q-54 54.5-127 86T480-80Z"/>
                    </svg>

                </NavLink>
                <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="var(--navbar-svg-size)" viewBox="0 -960 960 960"
                         width="var(--navbar-svg-size)"
                         fill="#5f6368">
                        <path
                            d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                    </svg>
                </NavLink>
            </div>
            <div className={"nav-right flex glass"}>
                <div className={"flex"} >
                    <NavLink to="/" className={({isActive}) => isActive ? "active" : ""}>
                        <svg  xmlns="http://www.w3.org/2000/svg"
                              height="var(--navbar-svg-size)" viewBox="0 -960 960 960" width="var(--navbar-svg-size)"
                              fill="#5f6368">
                            <path
                                d="M806-440H320v-80h486l-62-62 56-58 160 160-160 160-56-58 62-62ZM600-600v-160H200v560h400v-160h80v160q0 33-23.5 56.5T600-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400q33 0 56.5 23.5T680-760v160h-80Z"/>
                        </svg>

                    </NavLink>
                    <label className={"navbar-text"}>התנתק</label>
                </div>
            </div>
        </div>

    )
}