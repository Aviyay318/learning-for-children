import "./Map.css";
import Island from "../../components/Island/Island.jsx";
import {
    DIVISION_ISLAND,
    DIVISION_ISLAND_BACKGROUND,
    EQUATIONS_ISLAND,
    EQUATIONS_ISLAND_BACKGROUND,
    FLOATING_POINT_ISLAND,
    FLOATING_POINT_ISLAND_BACKGROUND,
    HORROR_ISLAND,
    HORROR_ISLAND_BACKGROUND,
    LONG_ADDITION_SUBTRACTION_ISLAND,
    LONG_ADDITION_SUBTRACTION_ISLAND_BACKGROUND,
    LONG_MULTIPLICATION_DIVISION_ISLAND,
    LONG_MULTIPLICATION_DIVISION_ISLAND_BACKGROUND,
    MULTIPLICATION_ISLAND,
    MULTIPLICATION_ISLAND_BACKGROUND,
    SIMPLE_MATH_ISLAND,
    SIMPLE_MATH_ISLAND_BACKGROUND
} from "../../utils/IslandConstants.js";

import { useState } from "react";
import MessageBubble from "../../components/MessageBubble/MessageBubble.jsx";
import {useBubbleMessage} from "../../hooks/uiHooks/useBubbleMessage.js";
import useApi from "../../hooks/apiHooks/useApi.js";
import {GET_QUESTION_TYPE} from "../../utils/Constants.js";

export default function Map() {
    // Track which islands are unlocked
    const [unlockedIslands, setUnlockedIslands] = useState({
        simpleMathIsland: true,
        multiplicationIsland: true,
        divisionIsland: true,
        floatingPointIsland: true,
        longAddSubIsland: true,
        longMultDivIsland: true,
        horrorIsland: true,
        equationsIsland: true,
    });
    const { bubbleMessage, showMessage, clearError } = useBubbleMessage();
    const {} = useApi(GET_QUESTION_TYPE)
    const handleIslandClick = ({ locked, islandKey }) => {
        if (locked) {
            showMessage("🔒 האי הזה נעול!");
        } else {
            console.log("You clicked:", islandKey);
        }
    };


    const handleIslandCompletion = (islandKey) => {
        const unlockOrder = [
            "simpleMathIsland",
            "multiplicationIsland",
            "divisionIsland",
            "floatingPointIsland",
            "longAddSubIsland",
            "longMultDivIsland",
            "horrorIsland",
            "equationsIsland",
        ];

        const currentIndex = unlockOrder.indexOf(islandKey);
        const nextIslandKey = unlockOrder[currentIndex + 1];

        if (nextIslandKey) {
            setUnlockedIslands((prev) => ({
                ...prev,
                [nextIslandKey]: true,
            }));
        }
    };

    const renderIsland = ({ key, name, className, island, background, types }) => (
        <>
            <Island
                key={key}
                className={className}
                name={name}
                island={island}
                background={background}
                locked={!unlockedIslands[key]}
                onClick={handleIslandClick}
                islandKey={key}
                types={types}

            >
                {bubbleMessage && (
                    <MessageBubble
                        message={bubbleMessage}
                        position={{ top: "20%", right: "50%" }}
                        scale="0.85"
                    />
                )}
            </Island>
        </>

    );


    const navigateTo = () =>{

    }

    const islandConfigs = [
        {
            key: "simpleMathIsland",
            name: "אי החיבור והחיסור",
            className: "simpleMathIsland",
            island: SIMPLE_MATH_ISLAND,
            background: SIMPLE_MATH_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "yellow" },
                2: { label: "שאלות מילוליות", color: "pink" },
                3: { label: "השלם לוח", color: "green" },
                4: { label: "שאלה אמריקקית", color: "blue" },
            }

        },
        {
            key: "multiplicationIsland",
            name: "אי הכפל",
            className: "multiplicationIsland",
            island: MULTIPLICATION_ISLAND,
            background: MULTIPLICATION_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "yellow" },
                2: { label: "שאלות מילוליות", color: "pink" },
                3: { label: "השלם לוח", color: "green" },
                4: { label: "שאלה אמריקקית", color: "blue" },
            }
        },
        {
            key: "divisionIsland",
            name: "אי החילוק",
            className: "divisionIsland",
            island: DIVISION_ISLAND,
            background: DIVISION_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "yellow" },
                2: { label: "שאלות מילוליות", color: "pink" },
                3: { label: "השלם לוח", color: "green" },
                4: { label: "שאלה אמריקקית", color: "blue" },
            }
        },
        {
            key: "floatingPointIsland",
            name: "האי העשרוני",
            className: "floatingPointIsland",
            island: FLOATING_POINT_ISLAND,
            background: FLOATING_POINT_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "yellow" },
                2: { label: "שאלות מילוליות", color: "pink" },
                3: { label: "השלם לוח", color: "green" },
                4: { label: "שאלה אמריקקית", color: "blue" },
            }
        },
        {
            key: "longAddSubIsland",
            name: "אי החיבור והחיסור הארוך",
            className: "longAddSubIsland",
            island: LONG_ADDITION_SUBTRACTION_ISLAND,
            background: LONG_ADDITION_SUBTRACTION_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "pink" },
                2: { label: "שאלות מילוליות", color: "yellow" },
            }
        },
        {
            key: "longMultDivIsland",
            name: "אי הכפל והחילוק הארוך",
            className: "longMultDivIsland",
            island: LONG_MULTIPLICATION_DIVISION_ISLAND,
            background: LONG_MULTIPLICATION_DIVISION_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "white" },
                2: { label: "שאלות מילוליות", color: "blue" },
            }
        },
        {
            key: "horrorIsland",
            name: "האי הסיוטי",
            className: "horrorIsland",
            island: HORROR_ISLAND,
            background: HORROR_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "yellow" },
                2: { label: "שאלות מילוליות", color: "blue" },
            }
        },
        {
            key: "equationsIsland",
            name: "אי המשוואות",
            className: "equationsIsland",
            island: EQUATIONS_ISLAND,
            background: EQUATIONS_ISLAND_BACKGROUND,
            types: {
                1: { label: "פעולות חשבון", color: "blue" },
                2: { label: "שאלות מילוליות", color: "purple" },
            }
        },
    ];

    return (
        <div className="map-container flex">

            <div className="islands-container">
                {islandConfigs.map((islandConfig) => renderIsland(islandConfig))}
            </div>

        </div>
    );
}
