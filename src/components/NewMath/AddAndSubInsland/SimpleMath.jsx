// 1. SimpleMath.jsx
import React, { useEffect, useRef, useState } from "react";
import { SimpleExercise } from "../ExerciseTypes/SimpleExercise.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import "./AddAndSubIsland.css";
import { useUser } from "../../../contexts/UserContext.jsx";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.jsx";

export default function SimpleMath({ questionType, url }) {
    const { data, loading, error, sendRequest } = useGetApi(url);
    const [showHint, setShowHint] = useState(false);
    const [usedClue, setUsedClue] = useState(false);
    const [solutionTime, setSolutionTime] = useState(0);
    const { user, setUser } = useUser();
    const { checkAnswer, feedback, showSolution, setShowSolution, resetTimer, startTimeRef } = useAnswerCheck({ questionType, setUser });

    const loadNewQuestion = () => {
        const token = Cookies.get("token");
        setShowHint(false);
        setUsedClue(false);
        if (token) {
            sendRequest({ token, questionType });
            resetTimer();
            setSolutionTime(0);
        }
    };

    useEffect(() => {
        loadNewQuestion();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCheck = (answer) => {
        checkAnswer({ userAnswer: answer, data, usedClue });
    };

    return (
        <div className="simple-math-container" dir="rtl">
            {loading || !data ? (
                <div>טוען שאלה...</div>
            ) : (
                <div className="simple-math-box flex">
                    <SimpleExercise question={data} checkAnswer={handleCheck} />
                    <div className="text-sm text-gray-600 mt-2">⏱ זמן פתרון: {solutionTime} שניות</div>
                    {feedback && <div className="text-lg font-semibold text-purple-700">{feedback}</div>}
                    {showSolution && <div className="text-green-800 font-bold">הפתרון הנכון הוא: {data.solution}</div>}
                    {showHint && <div className="text-orange-600 font-medium">טיפ: נסה לפרק את המספרים 🍊</div>}
                    <div className="flex gap-4 mt-4">
                        <button onClick={loadNewQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">שאלה הבאה</button>
                        <button onClick={() => setShowSolution(true)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">הצג פתרון</button>
                        <button onClick={() => { setShowHint(true); setUsedClue(true); }} className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">הצג עזר</button>
                    </div>
                </div>
            )}
        </div>
    );
}