// CompleteTheBoardExercise.jsx
import "./CompleteTheBoardExercise.css"
import React, { useState, useEffect, useCallback } from "react";
import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";
import QuestionBoard from "/src/assets/images/Islands/Props/MultiChoiceQuestionAssets/question_board.png";
import YellowButton from "/src/assets/images/Islands/Props/MultiChoiceQuestionAssets/yellow_button.png";

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const CompleteTheBoardExercise = ({ questions, onRestart }) => {
    const [remaining, setRemaining] = useState([]);
    const [currentQ, setCurrentQ] = useState(null);
    const [board, setBoard] = useState([]);
    const [currentQ, setCurrentQ]   = useState(null);
    const [board, setBoard]         = useState([]);
    const {height} = useWindowSize()
    const scale = Math.min(1, height / 1080);

    useEffect(() => {
        if (questions?.length) {
            setRemaining(questions.slice());
            setCurrentQ(null);
            setBoard([]);
        }
    }, [questions]);

    const advance = useCallback(() => {
        if (remaining.length === 0) {
            onRestart();
            return;
        }

        const [next, ...rest] = remaining;
        setCurrentQ(next);
        setRemaining(rest);

        const sols = [next.solution, ...rest.map((q) => q.solution)];
        shuffle(sols);
        setBoard(sols);
    }, [remaining, onRestart]);

    useEffect(() => {
        if (remaining.length && currentQ === null) {
            advance();
        }
    }, [remaining, currentQ, advance]);

    const handleClick = (ans) => {
        if (!currentQ) return;
        if (ans === currentQ.solution) {
            advance();
        }
    };

    if (!currentQ) {
        return <div>טוען שאלות...</div>;
    }

    return (
        <div
            className="complete-the-board-container flex"
            dir="rtl"
        >
            <div className="question-container flex">
                <img className="question-board" src={QuestionBoard} alt="Question Board" />
                <label>{currentQ.num1} {currentQ.operator} {currentQ.num2} {currentQ.equalsSign}</label>
            </div>
            <div className="board-answers">
                {board.map((ans, i) => (
                    <div className="answer-button flex" key={i}>
                        <img src={YellowButton} alt="Question Board" />
                        <button onClick={() => handleClick(ans)}>{ans}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};
