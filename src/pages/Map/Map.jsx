// 📁 src/pages/Map/Map.jsx
import { useEffect, useState } from "react";
import { GET_USER_OPEN_ISLAND } from "../../utils/Constants.js";
import { ISLAND_CONFIGS } from "../../utils/IslandConfig.js";
import Island from "../../components/Island/Island.jsx";
import MessageBubble from "../../components/MessageBubble/MessageBubble.jsx";
import { useBubbleMessage } from "../../hooks/uiHooks/useBubbleMessage.js";
import useApi from "../../hooks/apiHooks/useApi.js";
import Cookies from "js-cookie";
import "./Map.css";

export default function Map() {
    const { bubbleMessage, showMessage, clearError } = useBubbleMessage();
    const { sendRequest } = useApi(GET_USER_OPEN_ISLAND, "GET",0);

    const [openStatus, setOpenStatus] = useState({});

    useEffect(() => {
        const fetchOpenIslands = async () => {
            const token = Cookies.get("token");
            const response = await sendRequest({ token });

            if (Array.isArray(response)) {
                const statusMap = {};
                response.forEach(({ id, isOpen }) => {
                    statusMap[id] = isOpen;
                });
                setOpenStatus(statusMap);
            } else {
                showMessage("שגיאה בטעינת האיים ❌");
            }
        };

        fetchOpenIslands();
    }, []);

    const handleIslandClick = ({ locked }) => {
        if (locked) {
            clearError();
            showMessage("🔒 האי הזה נעול!");
        } else {
            clearError();
        }
    };

    return (
        <div className="map-container flex">
            {bubbleMessage && (
                <MessageBubble
                    message={bubbleMessage}
                    position={{ top: "50%", right: "50%" }}
                    scale="1.1"
                    duration="1.5"
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
                        cardBackground={island.cardBackground}
                        url={island.url}
                        buttonColor={island.buttonColor}
                        locked={!openStatus[island.id]} // ✅ preserves order by ID
                        onClick={handleIslandClick}
                    />
                ))}
            </div>
        </div>
    );
}
