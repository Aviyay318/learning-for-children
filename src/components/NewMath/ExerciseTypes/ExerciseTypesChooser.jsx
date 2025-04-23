// 📁 src/components/NewMath/ExerciseTypes/ExerciseTypesChooser.jsx
import React, { useEffect, useState } from "react";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { GET_QUESTION_TYPE } from "../../../utils/Constants.js";

// your UIs:
import SimpleMath from "../AddAndSubInsland/SimpleMath.jsx";
import LiteralProblemNew from "../AddAndSubInsland/LiteralProblemNew.jsx";
import MultipleAnswer from "../AddAndSubInsland/MultipleAnswer.jsx";
import CompleteTheBoardNew from "../AddAndSubInsland/CompleteTheBoardNew.jsx";

import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";
import "./ExerciseTypeChooser.css";

export default function ExerciseTypesChooser({ islandId, onChoose }) {
    const { data, sendRequest } = useGetApi(GET_QUESTION_TYPE);
    const [types, setTypes] = useState([]);

    // static map from server‐id → route/component
    const EXERCISE_TYPES = {
        1: { component: <SimpleMath questionType={1}/> },
        2: { component: <LiteralProblemNew questionType={2}/> },
        3: { component: <MultipleAnswer questionType={3}/> },
        4: { component: <CompleteTheBoardNew questionType={4}/> },
    };

    // cycle colors
    const palette = [
        buttonColorClassMap.green,
        buttonColorClassMap.yellow,
        buttonColorClassMap.blue,
        buttonColorClassMap.white,
    ];

    // fetch once
    useEffect(() => void sendRequest({}), []);

    // when data arrives, filter+map
    useEffect(() => {
        if (!data) return;
        const supported = data
            .filter((t) => EXERCISE_TYPES[t.id])
            .map((t) => ({
                id: t.id,
                label: t.name,
                component: EXERCISE_TYPES[t.id].component,
            }));
        setTypes(supported);
    }, [data]);

    return (
        <div className="exercise-type-chooser-container flex">
            <div className="exercise-type-chooser-box flex">
                {types.map((type, idx) => (
                    <button
                        key={type.id}
                        className={`type-chooser ${palette[idx % palette.length]}`}
                        onClick={() => onChoose(type.component)}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
