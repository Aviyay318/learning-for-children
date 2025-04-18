import "./Island.css";
import { useState } from "react";
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
                                   className,
                                   name,
                                   island,
                                   background,
                                   locked,
                                   onClick,
                                   islandKey,
                                   types

                               }) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();

        if (locked) {
            onClick?.({ locked, islandKey }); // show lock message
        } else {
            setIsFlipped((prev) => !prev); // flip island
        }
    };

    return (
        <div
            className={`${className} island-container`}
            onClick={handleClick}
        >
            <div className={`island-card ${isFlipped ? "flipped" : ""}`}>
                <div className="island-card-face island-card-front">
                    <img className="island-image" src={island} alt="island" />
                </div>

                <div className="island-card-face island-card-back">
                    <label className="island-name">{name}</label>
                    <img className="island-image" src={island} alt="island" />
                    <img className="island-background-image" src={background} alt="background" />
                        <div className={"question-type-chooser"}>
                            {types &&
                                Object.entries(types).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        className={`question-type ${colorClassMap[color] || ""}`}
                                    >
                                        {label}
                                    </button>
                                ))}
                        </div>
                </div>

                {
                    locked && (
                    <div className="lock-overlay">
                        <img src={LOCK_ISLAND} alt="locked" className="lock-icon" />
                    </div>)
                }
            </div>
        </div>
    );
}
