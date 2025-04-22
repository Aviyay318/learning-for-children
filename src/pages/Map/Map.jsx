// 📁 src/pages/Map/Map.jsx
import "./Map.css";
import { useState } from "react";
import ISLAND_CONFIGS from "../../utils/IslandConfig.js"; // array
import Island from "../../components/Island/Island.jsx";
import MessageBubble from "../../components/MessageBubble/MessageBubble.jsx";
import { useBubbleMessage } from "../../hooks/uiHooks/useBubbleMessage.js";

export default function Map() {
    const [unlockedIslands, setUnlockedIslands] = useState(() => {
        const init = {};
        ISLAND_CONFIGS.forEach((isl, idx) => {
            init[isl.key] = idx === 0; // unlock only the first island
        });
        return init;
    });

    const { bubbleMessage, showMessage, clearError } = useBubbleMessage();

    const handleIslandClick = ({ locked }) => {
        if (locked) {
            clearError()
            showMessage("🔒 האי הזה נעול!");
        }
        else clearError();
    };

    return (
        <div className="map-container flex">
            {bubbleMessage && (
                <MessageBubble
                    message={bubbleMessage}
                    position={{ top: "50%", right: "50%" }}
                    scale="1.1"
                    // type={}
                    duration={"1.5"}
                />
            )}
            <div className="islands-container">
                {ISLAND_CONFIGS.map((island) => (
                    <Island
                        key={island.key}
                        islandKey={island.key}
                        className={island.className}
                        name={island.name}
                        island={island.island}
                        background={island.background}
                        url={island.url}
                        buttonColor={island.buttonColor}
                        locked={!unlockedIslands[island.key]}
                        onClick={handleIslandClick}
                    />
                ))}
            </div>
        </div>
    );
}
