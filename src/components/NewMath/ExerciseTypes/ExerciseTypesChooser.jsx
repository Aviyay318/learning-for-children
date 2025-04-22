import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { GET_QUESTION_TYPE } from "../../../utils/Constants.js";
import { useEffect, useState } from "react";
import {SimpleMath} from "../AddAndSubInsland/SimpleMath.jsx";
import MultipleAnswer from "../AddAndSubInsland/MultipleAnswer.jsx";
import LiteralProblem from "../../Math/literalProblem/LiteralProblem.jsx";


// import CompleteTheBoard from "...";
// import AmericanQuestion from "...";

export default function ExerciseTypesChooser({ buttonClassname }) {
    const { data: questionTypeData, error, loading, sendRequest } = useGetApi(GET_QUESTION_TYPE);
    const [types, setTypes] = useState([]);
    const [activeType, setActiveType] = useState(null);

    // מפה שמחזירה קומפוננטה לפי ID
    const componentsMap = {
        1: (id) => <SimpleMath questionType={id} />,
        2: (id) => <LiteralProblem questionType={id} />,
        3: (id) =><MultipleAnswer questionType={id}/>,
        // 4: (id) => <CompleteTheBoard questionType={id} />,

    };

    // טען סוגי שאלות
    useEffect(() => {
        sendRequest({});
    }, []);

    // עדכון סוגים מהשרת
    useEffect(() => {
        if (questionTypeData) {
            const mapped = questionTypeData.map((type) => ({
                id: type.id,
                label: type.name,
            }));
            setTypes(mapped);
        }
    }, [questionTypeData]);

    // בונה את הקומפוננטה רק אם קיים ב־map
    const activeComponent = componentsMap[activeType]
        ? componentsMap[activeType](activeType)
        : <div className="text-red-500">Component not defined</div>;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex gap-3 flex-wrap justify-center">
                {types.map((type) => (
                    <button
                        key={type.id}
                        className={`${buttonClassname} ${activeType === type.id ? "bg-blue-600 text-white" : ""}`}
                        onClick={() => {
                            setActiveType(type.id);
                            // alert(type.id); // רק אם את רוצה
                        }}
                    >
                        {type.label}
                    </button>
                ))}
            </div>


            <div className="w-full max-w-3xl mt-6">
                {activeComponent}
            </div>
        </div>
    );
}
