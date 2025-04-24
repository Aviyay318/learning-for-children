// 2. MultipleAnswer.jsx
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { MultipleAnswerExercise } from "../ExerciseTypes/MultipleAnswerExercise.jsx";
import { useUser } from "../../../contexts/UserContext.jsx";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.jsx";

export default function MultipleAnswer({ questionType, url }) {
    const { data, error, loading, sendRequest } = useGetApi(url);
    const [solutionTime, setSolutionTime] = useState(0);
    const { user, setUser } = useUser();
    const { checkAnswer, feedback, resetTimer, startTimeRef } = useAnswerCheck({ questionType, setUser });

    const loadQuestion = () => {
        const token = Cookies.get("token");
        sendRequest({ token, questionType });
        resetTimer();
        setSolutionTime(0);
    };

    useEffect(() => {
        loadQuestion();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCheck = (selectedAnswer) => {
        checkAnswer({ userAnswer: Number(selectedAnswer), data });
    };

    const question = data ? `${data.num1} ${data.operator} ${data.num2} = ?` : "";
    const options = data ? data.options.map((val) => ({ value: val })) : [];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 gap-4">
            {loading && <div>טוען שאלה...</div>}
            {error && <div className="text-red-500">{error}</div>}
            {data && (
                <MultipleAnswerExercise
                    question={question}
                    options={options}
                    checkAnswer={handleCheck}
                    solutionTime={solutionTime}
                />
            )}
            {feedback && <div className="text-lg text-purple-800 font-bold">{feedback}</div>}
            <button onClick={loadQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4">שאלה הבאה</button>
        </div>
    );
}
