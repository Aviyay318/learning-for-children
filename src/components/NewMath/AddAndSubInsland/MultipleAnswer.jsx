import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { MultipleAnswerExercise } from "../ExerciseTypes/MultipleAnswerExercise.jsx";
import axios from "axios";
import {SERVER_URL} from "../../../utils/Constants.js";
import {useUser} from "../../../contexts/UserContext.jsx";

export default function MultipleAnswer({ questionType, url}) {
    const { data, error, loading, sendRequest } = useGetApi(url);
    const [feedback, setFeedback] = useState("");
    const [solutionTime, setSolutionTime] = useState(0);
    const startTimeRef = useRef(Date.now());
    const { user, setUser } = useUser();
    const loadQuestion = () => {
        const token = Cookies.get("token");
        sendRequest({ token, questionType });
        setFeedback("");
        startTimeRef.current = Date.now();
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

    const checkAnswer = async (selectedAnswer) => {
        const token = Cookies.get("token");
        const time = Math.floor((Date.now() - startTimeRef.current) / 1000);
        try {
            const response = await axios.get(`${SERVER_URL}/api/islands/check-exercise`, {
                params: {
                    token: token,
                    exerciseId: data.id,
                    answer: Number(selectedAnswer),
                    solution_time: time,
                    usedClue: false,
                    questionType: questionType,
                },
            });

            const result = response.data;
            setUser(result.user)

            setFeedback(result.message);

            // תוכל להפעיל לוגיקה נוספת אם התשובה שגויה
            // if (result.message === "wrong answer") {
            //     setShowSolution(true);
            // }
        } catch (error) {
            console.error("שגיאה בבדיקה:", error);
            setFeedback("שגיאה בבדיקה מול השרת");
        }
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
                    checkAnswer={checkAnswer}
                    solutionTime={solutionTime}
                />
            )}
            {feedback && <div className="text-lg text-purple-800 font-bold">{feedback}</div>}
            <button
                onClick={loadQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4"
            >
                שאלה הבאה
            </button>
        </div>
    );
}
