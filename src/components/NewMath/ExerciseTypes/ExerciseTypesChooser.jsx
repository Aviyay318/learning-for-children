import React, { useEffect, useState } from "react";
import useApi from "../../../hooks/apiHooks/useApi.js";
import { GET_QUESTION_TYPE } from "../../../utils/Constants.js";

import SimpleMath from "../AddAndSubInsland/SimpleMath.jsx";
import LiteralProblemNew from "../AddAndSubInsland/LiteralProblemNew.jsx";
import MultipleAnswer from "../AddAndSubInsland/MultipleAnswer.jsx";
import CompleteTheBoardNew from "../AddAndSubInsland/CompleteTheBoardNew.jsx";

import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";

import SimpleMathIcon      from "/src/assets/images/Islands/props/question selection icons/simple_math.png";
import LiteralProblemIcon  from "/src/assets/images/Islands/props/question selection icons/literal_problems.png";
import MultipleChoiceIcon  from "/src/assets/images/Islands/props/question selection icons/multiple_choice.png";
import CompleteBoardIcon   from "/src/assets/images/Islands/props/question selection icons/complete_board.png";

import "./ExerciseTypeChooser.css";
import {ISLAND_CONFIGS_BY_ID} from "../../../utils/IslandConfig.js";

export default function ExerciseTypesChooser({ islandId, onChoose, url }) {
    const { data, sendRequest } = useApi(GET_QUESTION_TYPE, "GET", { minDelay: 0 });
    const [types, setTypes]     = useState([]);
    const island = ISLAND_CONFIGS_BY_ID[islandId];

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

    // split into two rows
    const half      = Math.ceil(types.length / 2);
    const topRow    = types.slice(0, half);
    const bottomRow = types.slice(half);

    return (
        <div className="exercise-type-chooser-container">
            <div className="chooser-row">
                {topRow.map((type, i) => (
                    <button
                        key={type.id}
                        className={`type-chooser ${palette[i % palette.length]}`}
                        onClick={() => onChoose(type.component)}
                    >
                        <img
                            src={ICON_MAP[type.id]}
                            alt=""
                            className="type-chooser-icon"
                        />
                        <span className="type-chooser-label">{type.label}</span>
                    </button>
                ))}
            </div>

            <img
                src={island.childrenThinking}
                alt="thinking"
                className="chooser-child-thinking"
            />

            <div className="chooser-row">
                {bottomRow.map((type, i) => (
                    <button
                        key={type.id}
                        className={`type-chooser ${palette[(i+half) % palette.length]}`}
                        onClick={() => onChoose(type.component)}
                    >
                        <img
                            src={ICON_MAP[type.id]}
                            alt=""
                            className="type-chooser-icon"
                        />
                        <span className="type-chooser-label">{type.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}