// 📁 CompleteTheBoardExercise.jsx
import React, { useState, useEffect, useCallback } from "react";
import QuestionBoard from "/src/assets/images/Islands/Props/MultiChoiceQuestionAssets/question_board.png";
import YellowButton from "/src/assets/images/Islands/Props/MultiChoiceQuestionAssets/yellow_button.png";
import BlueButton   from "/src/assets/images/Islands/Props/MultiChoiceQuestionAssets/blue_button.png";
import "./CompleteTheBoardExercise.css";

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export const CompleteTheBoardExercise = ({ questions, onRestart }) => {
    const [questionIndex, setQuestionIndex] = useState(0);

    // board: array of { value: number, isCorrect: boolean }
    const [board, setBoard] = useState([]);

    useEffect(() => {
        if (!questions?.length) return;
        const initBoard = shuffle(
            questions.map((q, idx) => ({
                id: idx,              // stable ID
                value: q.solution,
                isCorrect: false
            }))
        );
        setBoard(initBoard);
        setQuestionIndex(0);
    }, [questions]);

    const currentQ = questions[questionIndex];

    const handleClick = useCallback(
        (id) => {
            // find that board entry
            const clicked = board.find((b) => b.id === id);
            if (!clicked || clicked.value !== currentQ.solution) return;

            // mark only that one correct
            setBoard((prev) =>
                prev.map((b) =>
                    b.id === id ? { ...b, isCorrect: true } : b
                )
            );

            // advance or restart
            if (questionIndex + 1 < questions.length) {
                setQuestionIndex((i) => i + 1);
            } else {
                onRestart();
            }
        },
        [board, currentQ, questionIndex, questions.length, onRestart]
    );

    if (!questions?.length) {
        return <div>טוען שאלות…</div>;
    }

    return (
        <div className="complete-the-board-container flex" dir="rtl">
            <div className="question-container flex">
                <img className="question-board" src={QuestionBoard} alt="Question Board" />
                <label>
                    {currentQ.num1} {currentQ.operator} {currentQ.num2} {currentQ.equalsSign}
                </label>
            </div>

            <div className="board-answers flex">
                {board.map((btn) => (
                    <div className="answer-button flex" key={btn.id}>
                        <img
                            src={btn.isCorrect ? BlueButton : YellowButton}
                            alt="answer button"
                        />
                        <button
                            onClick={() => handleClick(btn.id)}   // pass btn.id, not array index
                            disabled={btn.isCorrect}
                        >
                            {!btn.isCorrect && btn.value}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
