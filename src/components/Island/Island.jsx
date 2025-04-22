import "./Island.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCK_ISLAND } from "../../utils/IslandConstants.js";
const colorClassMap = {
    yellow: "btn-yellow",
    pink: "btn-pink",
    red: "btn-red",
    blue: "btn-blue",
    green: "btn-green",
    orange: "btn-orange",
    purple: "btn-purple",
    white: "btn-white",
    deepBlue: "btn-deep-blue",
};

export default function Island({
                                   name,
                                   className,
                                   island,
                                   cardBackground,
                                   url = "",
                                   buttonColor,
                                   islandKey,
                                   locked,
                                   onClick,
                               }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        if (locked) {
            onClick?.({ locked, islandKey });
        } else {
            setIsFlipped((prev) => !prev);
        }
    };

    const handleEnterIsland = (e) => {
        e.stopPropagation();
        if (url) navigate(url);
    };

    return (
        <div
            className={`${className} island-container`}
            onClick={handleClick}
        >
            <div className={`island-card ${isFlipped ? "flipped" : ""}`}>
                {/* Front Face */}
                <div className="island-card-face island-card-front">
                    <img className="island-image" src={island} alt="island" />
                </div>

                {/* Back Face */}
                <div className="island-card-face island-card-back">
                    <label className="island-name">{name}</label>
                    <img className="island-image" src={island} alt="island" />
                    <img className="island-background-image" src={cardBackground} alt="cardBackground" />

                    {url && (
                        <button
                            className={`island-entrance-button ${colorClassMap[buttonColor] || ""}`}
                            onClick={handleEnterIsland}
                        >
                            היכנס!
                        </button>
                    )}
                </div>

                {/* Lock Overlay */}
                {locked && (
                    <div className="lock-overlay">
                        <img src={LOCK_ISLAND} alt="locked" className="lock-icon" />
                    </div>
                )}
            </div>
        </div>
    );
}
