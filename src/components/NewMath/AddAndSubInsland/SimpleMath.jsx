import React, { useEffect, useRef, useState } from "react";
import { SimpleExercise } from "../ExerciseTypes/SimpleExercise.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER_URL } from "../../../utils/Constants.js";
import "./AddAndSubIsland.css"

export default function SimpleMath ({ questionType ,url}) {
    const { data, loading, error, sendRequest } = useGetApi(url);

    const [feedback, setFeedback] = useState(null);
    const [showSolution, setShowSolution] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [usedClue, setUsedClue] = useState(false);
    const [solutionTime, setSolutionTime] = useState(0);
    const startTimeRef = useRef(Date.now());

    const loadNewQuestion = () => {
        const token = Cookies.get("token");
        setFeedback(null);
        setShowSolution(false);
        setShowHint(false);
        setUsedClue(false);
        if (token) {
            sendRequest({ token, questionType: questionType });
            startTimeRef.current = Date.now();
            setSolutionTime(0);
        }
    };

    useEffect(() => {
        loadNewQuestion();
    }, []);

    // טיימר שמעדכן כל שנייה את הזמן
    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const checkAnswer = async (userAnswer) => {
        const token = Cookies.get("token");
        if (!token || !data) return;

        const time = Math.floor((Date.now() - startTimeRef.current) / 1000);

        try {
            const response = await axios.get(`${SERVER_URL}/api/islands/check-exercise`, {
                params: {
                    token: token,
                    exerciseId: data.id,
                    answer: userAnswer,
                    solution_time: time,
                    usedClue,
                    questionType: questionType,
                },
            });

            const result = response.data;
            setFeedback(result.message);

            if (result.message === "wrong answer") {
                setShowSolution(true);
            }
        } catch (error) {
            setFeedback("שגיאה בבדיקה מול השרת");
        }
    };

    const questionText = data ? `${data.num1} ${data.operator} ${data.num2} ${data.equalsSign} ?` : "";

    return (
        <div className="simple-math-container" dir="rtl">
            {loading || !data ? (
                <div>טוען שאלה...</div>
            ) : (
                <div className={"simple-math-box flex"}>
                    <SimpleExercise question={data} checkAnswer={checkAnswer} />

                    {/* זמן פתרון */}
                    <div className="text-sm text-gray-600 mt-2">
                        ⏱ זמן פתרון: {solutionTime} שניות
                    </div>

                    {feedback && (
                        <div className="text-lg font-semibold text-purple-700">{feedback}</div>
                    )}

                    {showSolution && (
                        <div className="text-green-800 font-bold">
                            הפתרון הנכון הוא: {data.solution}
                        </div>
                    )}

                    {showHint && (
                        <div className="text-orange-600 font-medium">
                            טיפ: נסה לפרק את המספרים לחלקים קטנים או להשתמש בדמיון חזותי 🍊
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={loadNewQuestion}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            שאלה הבאה
                        </button>
                        <button
                            onClick={() => setShowSolution(true)}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                        >
                            הצג פתרון
                        </button>
                        <button
                            onClick={() => {
                                setShowHint(true);
                                setUsedClue(true);
                            }}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
                        >
                            הצג עזר
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};
