import React from "react";
import "./ExerciseBoard.css"
import {ResponsiveLabel} from "../../ResponsiveLabel/ResponsiveLabel.jsx";

export default function SimpleExercise  ({ question, checkAnswer })  {
    const [answer, setAnswer] = React.useState("");

    const handleSubmit = () => {
        checkAnswer(answer);
        setAnswer("");
    };

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
