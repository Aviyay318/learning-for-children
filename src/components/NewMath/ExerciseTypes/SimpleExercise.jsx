import React from "react";
import "./ExerciseBoard.css"

export const SimpleExercise = ({ question, checkAnswer }) => {
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
                    <button
                        onClick={handleSubmit}
                        className="ml-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
                    >
                        בדוק תשובה
                    </button>
                </div>
            )}

            {!question && <div className="text-gray-500">לא נטענה שאלה...</div>}
        </div>
    );
};
