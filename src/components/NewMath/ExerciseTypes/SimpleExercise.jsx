import React, {useEffect} from "react";
import "./ExerciseBoard.css"
import BasicHelper from "../../Math/BasicMath/BasicHelper/BasicHelper.jsx";

export default function SimpleExercise  ({ question, setHint, checkAnswer })  {
    const [answer, setAnswer] = React.useState("");

    const handleSubmit = () => {
        checkAnswer(answer);
        setAnswer("");
    };

    useEffect(() => {
        setHint(<BasicHelper num1={question.num1} num2={question.num2} operand={question.operator}/>)
    }, []);

    return (
        <div className="exercise-board-container">
            {question && (
                <div className={"exercise-board flex"}>
                    <div className="exercise-question flex">
                        <label>{question.num1}</label>
                        <label>{question.operator}</label>
                        <label>{question.num2}</label>
                        <label>{question.equalsSign}</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className=""
                            placeholder="?"
                        />

                    </div>

                </div>
            )}
            <button
                onClick={handleSubmit}
                className="exercise-submit-button"
            >
                בדוק תשובה
            </button>
            {!question && <div className="text-gray-500">לא נטענה שאלה...</div>}
        </div>
    );
};
