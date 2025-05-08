import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/apiHooks/useApi.js";
import { GET_QUESTION_TYPE } from "../../../utils/Constants.js";

import SimpleMath from "../AddAndSubInsland/SimpleMath.jsx";
import LiteralProblemNew from "../AddAndSubInsland/LiteralProblemNew.jsx";
import MultipleAnswer from "../AddAndSubInsland/MultipleAnswer.jsx";
import CompleteTheBoardNew from "../AddAndSubInsland/CompleteTheBoardNew.jsx";

import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";

import SimpleMathIcon      from "/src/assets/images/Islands/Props/QuestionSelectionIcons/simple_math.png";
import LiteralProblemIcon  from "/src/assets/images/Islands/Props/QuestionSelectionIcons/literal_problems.png";
import MultipleChoiceIcon  from "/src/assets/images/Islands/Props/QuestionSelectionIcons/multiple_choice.png";
import CompleteBoardIcon   from "/src/assets/images/Islands/Props/QuestionSelectionIcons/complete_board.png";

import "./ExerciseTypeChooser.css";

export default function ExerciseTypesChooser({island, onChoose, url }) {
    const { data, sendRequest } = useApi(GET_QUESTION_TYPE, "GET", { minDelay: 0 });
    const [types, setTypes]     = useState([]);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    const ICON_MAP = {
        1: SimpleMathIcon,
        2: LiteralProblemIcon,
        3: MultipleChoiceIcon,
        4: CompleteBoardIcon,
    };

    const EXERCISE_TYPES = {
        1: { component: <SimpleMath questionType={1} url={url}/> },
        2: { component: <LiteralProblemNew questionType={2} url={url}/> },
        3: { component: <MultipleAnswer questionType={3} url={url}/> },
        4: { component: <CompleteTheBoardNew questionType={4} url={url}/> },
    };

    // cycle colors
    const palette = [
        buttonColorClassMap.green,
        buttonColorClassMap.yellow,
        buttonColorClassMap.purple,
        buttonColorClassMap.blue,
    ];

    useEffect(() => { void sendRequest({}); }, []);
    useEffect(() => {
        if (!data) return;
        setTypes(data
            .filter(t => EXERCISE_TYPES[t.id])
            .map(t => ({
                id:        t.id,
                label:     t.name,
                component: EXERCISE_TYPES[t.id].component
            }))
        );
    }, [data]);

    if (!types.length) return null;


    return (
        <div className="exercise-type-chooser-container flex">
            <div className="exercise-type-chooser-box grid">
                {types.map((type, idx) => (
                    <button
                        key={type.id}
                        className={`type-chooser ${palette[idx % palette.length]}`}
                        onClick={() => onChoose(type.component, type.id)}
                        onMouseEnter={() => {
                            console.log("hovered button idx:", idx);
                            setHoveredIdx(idx);
                        }}
                        // onMouseLeave={() => setHoveredIdx(null)}
                    >
                        <img
                            src={ICON_MAP[type.id]}
                            alt={`${type.label} icon`}
                            className="clickable type-chooser-icon"
                        />
                        <span className="type-chooser-label">{type.label}</span>
                    </button>
                ))}

                <img
                    className={`children-thinking ${
                        hoveredIdx === null
                            ? ""
                            : hoveredIdx % 2 === 0
                                ? "face-left"
                                : "face-right"
                    }`}
                    src={island.childrenThinking}
                    alt="thinking"
                />
            </div>
        </div>
    );
}