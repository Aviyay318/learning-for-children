// 📁 src/components/Island/Island.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOCK_ISLAND } from "../../utils/IslandConstants.js";
import "./Island.css";

const colorClassMap = {
    yellow: "btn btn-yellow",
    pink: "btn btn-pink",
    red: "btn btn-red",
    blue: "btn btn-blue",
    green: "btn btn-green",
    orange: "btn btn-orange",
    purple: "btn btn-purple",
    white: "btn btn-white",
    deepBlue: "btn btn-deep-blue",
};

export default function Island({
                                   name,
                                   className,
                                   island,
                                   islandFlipped,
                                   cardBackground,
                                   url = "",
                                   buttonColor,
                                   islandKey,
                                   locked,
                                   onClick,
                                   shouldFlip = true,       // ◀ default to “flip enabled”
                               }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.stopPropagation();
        if (locked) {
            onClick?.({ locked, islandKey });
        } else if (shouldFlip) {
            setIsFlipped((f) => !f);
        } else {
            // non-flipping islands just navigate on click
            if (url) navigate(url);
        }
    };

    const handleEnterIsland = (e) => {
        e.stopPropagation();
        if (url) navigate(url);
    };

    // — if flipping is turned off, we’ll only render the front face,
    //   clicking it goes straight to `url` (or does your locked callback).
    if (!shouldFlip) {
        return (
            <div
                className={`${className} clickable island-container no-flip`}
                onClick={handleClick}
            >
                <img
                    className="island-background-image"
                    style={!shouldFlip && {
                        cursor: "pointer",

                    }}
                    src={cardBackground}
                    alt=""
                />
                <img className="island-image" src={island} alt={name} />
                {locked && (
                    <div className="lock-overlay">
                        <img src={LOCK_ISLAND} alt="locked" className="lock-icon" />
                    </div>
                )}
            </div>
        );
    }

    // — otherwise, full flipping card
    return (
        <div className={`${className} clickable island-container`} onClick={handleClick}>
            <div className={`island-card ${isFlipped ? "flipped" : ""}`}>
                {/* Front Face */}
                <div className="island-card-face island-card-front">
                    <img className="island-image" src={island} alt={name} />
                </div>

                {/* Back Face */}
                <div className="island-card-face island-card-back">
                    <img
                        className="island-background-image"
                        src={cardBackground}
                        alt=""
                    />
                    <label className="island-name">{name}</label>
                    <img className="island-image" src={islandFlipped} alt={name} />
                    {url && (
                        <button
                            className={`island-entrance-button ${
                                colorClassMap[buttonColor] || ""
                            }`}
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
