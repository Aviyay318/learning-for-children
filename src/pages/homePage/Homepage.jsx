// 📁 src/pages/Homepage.jsx
import React, { useRef } from "react";
import "./Homepage.css";
import Island from "../../components/Island/Island.jsx";
import UserBoard from "/src/assets/images/Homepage/user_board.png";
import BoyPicture  from "/src/assets/images/Homepage/boy.png";
import GirlPicture from "/src/assets/images/Homepage/girl.png";
import { useUser }      from "../../contexts/UserContext.jsx";
import { ISLAND_CONFIGS } from "../../utils/IslandConfig.js";
import useUserLevels    from "../../hooks/apiHooks/useUserLevels.js";
import Canvas from "../../components/Canvas/Canvas.jsx";

export default function Homepage() {
    const { user } = useUser();
    const { levels, loading } = useUserLevels();
    const carouselRef = useRef(null);

    const scrollByCard = (dir = 1) => {
        const c = carouselRef.current;
        if (!c) return;
        const card = c.querySelector(".homepage-island-card");
        const gap  = parseFloat(getComputedStyle(c).gap);
        c.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
    };

    return (
        <div className="homepage-container flex">
            <div className="homepage-content flex">
                <div className="homepage-header">
                    <img className="user-board" src={UserBoard} alt="User Board" />
                    <div className="homepage-user-data flex">
                        <img
                            className="homepage-picture"
                            src={user.user.gender === "boy" ? BoyPicture : GirlPicture}
                            alt="User"
                        />
                        <label className="homepage-username">
                            {user.user.username}
                        </label>
                    </div>

                </div>

                <div className="carousel-wrapper flex">
                    <button className="carousel-navigator prev" onClick={() => scrollByCard(1)}>
                        ‹
                    </button>

                    <div ref={carouselRef} className="card-carousel flex">
                        {loading ? (
                            <p>טוען השלבים שלך…</p>
                        ) : (
                            levels.map((lv) => {
                                const isl = ISLAND_CONFIGS.find((i) => i.id === lv.island.id);
                                if (!isl) return null;
                                return (
                                    <div key={isl.id} className="homepage-island-card flex">
                                        <Island
                                            island={isl.islandFlipped}
                                            cardBackground={isl.cardBackground}
                                            shouldFlip={false}
                                        />
                                        <label className="level-label">רמה {lv.level}</label>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    <button className="carousel-navigator next" onClick={() => scrollByCard(-1)}>
                        ›
                    </button>
                </div>
            </div>
        </div>
    );
}
