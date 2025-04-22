// 📁 src/components/NewMath/ExerciseTypes/ExerciseTypesChooser.jsx
import "./ExerciseTypeChooser.css";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { GET_QUESTION_TYPE } from "../../../utils/Constants.js";
import { useEffect, useState } from "react";
import { SimpleMath } from "../AddAndSubInsland/SimpleMath.jsx";
import MultipleAnswer from "../AddAndSubInsland/MultipleAnswer.jsx";
import LiteralProblem from "../../Math/literalProblem/LiteralProblem.jsx";
import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";

export default function ExerciseTypesChooser({ buttonClassname }) {
    const { data: questionTypeData, sendRequest } = useGetApi(GET_QUESTION_TYPE);
    const [types, setTypes] = useState([]);
    const [activeType, setActiveType] = useState(null);

    // only these four colors:
    const buttonColors = {
        green: buttonColorClassMap.green,
        yellow: buttonColorClassMap.yellow,
        blue: buttonColorClassMap.blue,
        white: buttonColorClassMap.white,
    };
    const palette = Object.values(buttonColors);
    // => [ 'btn-green', 'btn-yellow', 'btn-blue', 'btn-white' ]

    // map your incoming type‑IDs to the right exercise component
    const componentsMap = {
        1: (id) => <SimpleMath questionType={id} />,
        2: (id) => <LiteralProblem questionType={id} />,
        3: (id) => <MultipleAnswer questionType={id} />,
        // 4: (id) => <CompleteTheBoard questionType={id} />,
    };

    useEffect(() => {
        sendRequest({});
    }, []);

    useEffect(() => {
        if (questionTypeData) {
            setTypes(
                questionTypeData.map((t) => ({
                    id: t.id,
                    label: t.name,
                }))
            );
        }
    }, [questionTypeData]);

    // pick the right component (or a fallback)
    const ActiveComponent = componentsMap[activeType]
        ? componentsMap[activeType](activeType)
        : <div className="text-red-500">Component not defined</div>;

    return (
        <div className="exercise-type-chooser-container">
            <div className="exercise-type-chooser-box">
                {types.map((type, idx) => {
                    // cycle through your 4‑color palette
                    const colorClass = palette[idx % palette.length];
                    return (
                        <button
                            key={type.id}
                            className={`${buttonClassname} ${colorClass}`}
                            onClick={() => setActiveType(type.id)}
                        >
                            {type.label}
                        </button>
                    );
                })}
            </div>
            <div className="w-full max-w-3xl mt-6">
                {ActiveComponent}
            </div>
        </div>
    );
}
