import "./Homepage.css";
import {useLocation, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../utils/Constants.js";
import { toast } from "react-toastify";
import {ISLAND_CONFIGS} from "../../utils/IslandConfig.js";
import Island from "../../components/Island/Island.jsx";

export default function Homepage() {
    const location = useLocation();
    const { isAdmin } = location.state || {};

    const [levels, setLevels] = useState([]);
    const token = Cookies.get("token");

    useEffect(() => {
        getUserLevel();
    }, []);


    useEffect(() => {
        if (!token) return;

        const sse = new EventSource(`${SERVER_URL}/sse-notification/stream?token=${token}`);

        sse.addEventListener("message", (event) => {
            const newNotification = JSON.parse(event.data)[0];

            // הודעת טוסט חיה
            toast.info(
                `📢 ${newNotification.title}: ${newNotification.content}`,
                {
                    position: "top-right",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                }
            );
        });

        return () => sse.close();
    }, [token]);

    const getUserLevel = async () => {
        if (!token) {
            console.error("לא נמצא טוקן");
            return;
        }

        try {
            const { data } = await axios.get(`${SERVER_URL}/api/islands/get-level-by-user`, {
                params: { token }
            });
            console.log(data);
            setLevels(data);
        } catch (error) {
            console.error("שגיאה בקבלת שלב המשתמש:", error);
        }
    };


    return (
        <div className="homepage-container flex">
            <div className={"homepage-content flex"}>
                <div className="homepage-header glass">
                    <label className={"header"}>ברוכים השבים!</label>
                </div>
                {/* name,
                    className,
                    island,
                */}
                <h1>שלבים</h1>

                <div className="homepage-body flex">
                    {levels.length > 0 ? (
                        levels.map((level) => {
                            // 🔍 Find the matching island config by its `id`
                            const island = ISLAND_CONFIGS.find(
                                (isl) => isl.id === level.island.id
                            );
                            if (!island) return null;

                            return (
                                <div key={island.id} className="homepage-island-card flex">
                                    <Island
                                        island={island.island}
                                        cardBackground={island.cardBackground}
                                        shouldFlip={false}
                                    />
                                    <label className={"level-label"}>
                                        רמה {level.level}
                                    </label>
                                    <label className={"level-label"}>
                                        רמה גבוהה {level.highestLevel}
                                    </label>
                                </div>
                            );
                        })
                    ) : (
                        <p>טוען השלבים שלך…</p>
                    )}
                    {/*{levels.length !== 0 && (*/}
                    {/*    <table>*/}
                    {/*        <tbody>*/}
                    {/*        <tr>*/}
                    {/*            <td>האי</td>*/}
                    {/*            <td>שלב</td>*/}
                    {/*        </tr>*/}
                    {/*        {levels.map((level, index) => (*/}
                    {/*            <tr key={index}>*/}
                    {/*                <td>{level.island.name}</td>*/}
                    {/*                <td>{level.level}</td>*/}
                    {/*            </tr>*/}
                    {/*        ))}*/}
                    {/*        </tbody>*/}
                    {/*    </table>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>

    );
}
