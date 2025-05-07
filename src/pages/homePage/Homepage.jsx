import "./Homepage.css";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL } from "../../utils/Constants.js";
import { toast } from "react-toastify";
import {ISLAND_CONFIGS} from "../../utils/IslandConfig.js";
import Island from "../../components/Island/Island.jsx";
import UserBoard from "/src/assets/images/Homepage/user_board.png"
import BoyPicture from "/src/assets/images/Homepage/boy.png"
import GirlPicture from "/src/assets/images/Homepage/girl.png"
import {useUser} from "../../contexts/UserContext.jsx";
import Modal from "../../components/Modal/Modal.jsx";
import Guide from "../../components/Guide/Guide.jsx";

export default function Homepage() {
    const location = useLocation();
    const { isAdmin } = location.state || {};
    const { user } = useUser();
    const [levels, setLevels] = useState([]);
    const token = Cookies.get("token");

    const carouselRef = useRef(null);

    const scrollByCard = (direction = 1) => {
        const container = carouselRef.current;
        if (!container) return;
        // width of one card + gap (250px + 3rem)
        const scrollAmount = container.querySelector(".homepage-island-card")
            .offsetWidth + parseFloat(getComputedStyle(container).gap);
        container.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    };

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
            <Modal title={"הוראות"} component={<Guide/>} showModal={true} setShowModal={} />
            <div className={"homepage-content flex"}>
                <div className="homepage-header">
                    <img className={"user-board"} src={UserBoard} alt="User Board"/>
                    <div className={"homepage-user-data flex"}>
                        <img className={"homepage-picture"} src={user.user.gender === "boy"?BoyPicture:GirlPicture} alt="User Picture"/>
                        <label className={"homepage-username"}>{user.user.username}</label>
                    </div>

                </div>
                {/* name,
                    className,
                    island,
                */}
                {/*<h1>שלבים</h1>*/}
                <div className={"carousel-wrapper flex"}>
                    <button className="carousel-navigator prev" onClick={() => scrollByCard(1)}>‹</button>
                    <div ref={carouselRef} className="card-carousel flex">
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
                                            island={island.islandFlipped}
                                            cardBackground={island.cardBackground}
                                            shouldFlip={false}
                                        />
                                        <label className={"level-label"}>
                                            רמה {level.level}
                                        </label>
                                        {/*<label className={"level-label"}>*/}
                                        {/*    רמה גבוהה {level.highestLevel}*/}
                                        {/*</label>*/}
                                    </div>
                                );
                            })
                        ) : (
                            <p>טוען השלבים שלך…</p>
                        )}
                    </div>
                    <button className="carousel-navigator next" onClick={() => scrollByCard(-1)}>›</button>
                </div>

            </div>
        </div>

    );
}
