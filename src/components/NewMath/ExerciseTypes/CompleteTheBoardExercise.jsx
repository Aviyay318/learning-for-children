// CompleteTheBoardExercise.jsx
import React, { useState, useEffect, useCallback } from "react";
import {buttonColorClassMap} from "../../../utils/ButtonConstants.js";

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const CompleteTheBoardExercise = ({ questions, onRestart }) => {
    const [remaining, setRemaining] = useState([]);
    const [currentQ, setCurrentQ]   = useState(null);
    const [board, setBoard]         = useState([]);

    // 1) whenever `questions` prop changes, reset our state
    useEffect(() => {
        if (questions?.length) {
            setRemaining(questions.slice());   // copy
            setCurrentQ(null);
            setBoard([]);
        }
    }, [questions]);

    // 2) pick the next question + build its board
    const advance = useCallback(() => {
        if (remaining.length === 0) {
            // we’ve exhausted this batch → tell parent to fetch a new one
            onRestart();
            return;
        }

        const [next, ...rest] = remaining;
        setCurrentQ(next);
        setRemaining(rest);

        // include this question's solution + the rest’s solutions
        const sols = [next.solution, ...rest.map((q) => q.solution)];
        shuffle(sols);
        setBoard(sols);
    }, [remaining, onRestart]);

    // 3) on first load (or after a restart) kick off the first question
    useEffect(() => {
        if (remaining.length && currentQ === null) {
            advance();
        }
    }, [remaining, currentQ, advance]);

    const handleClick = (ans) => {
        if (!currentQ) return;
        if (ans === currentQ.solution) {
            // if that was the LAST one, advance() will fire onRestart()
            // otherwise we just advance to the next question
            advance();
        }
    };

    // while we’re waiting for parent to fetch new questions, show a loader
    if (!currentQ) {
        return <div>טוען שאלות...</div>;
    }

    return (
        <div>
            <div className="complete exercise-board  flex" dir="rtl">
                <div className="exercise-question flex">
                    <label>{currentQ.num1}</label>
                    <label>{currentQ.operator}</label>
                    <label>{currentQ.num2}</label>
                    <label>{currentQ.equalsSign}</label>
                </div>
            </div>
            <div className="options-button-box board-answers">
                {board.map((ans, i) => (
                    <button
                        key={i}
                        className={"board-answer-button"}
                        onClick={() => handleClick(ans)}
                    >
                        {ans}
                    </button>
                ))}
            </div>
        </div>

    );
};
