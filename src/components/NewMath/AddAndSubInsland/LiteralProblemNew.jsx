// LiteralProblemNew.jsx
import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Confetti from "react-confetti";
import LiteralProblemExercise from "../ExerciseTypes/LiteralProblemExercise.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { useUser } from "../../../contexts/UserContext.jsx";
import useAnswerCheck from "../../../hooks/useAnswerCheck.js";

export default function LiteralProblemNew({ questionType, url }) {
    const { data, error, loading, sendRequest } = useGetApi(url);
    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showImageHint, setShowImageHint] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [solutionTime, setSolutionTime] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const startTimeRef = useRef(Date.now());
    const { checkAnswer } = useAnswerCheck({
        getData: () => data,
        questionType,
        startTimeRef,
        setResult: setSuccess,
        usedClue: showHint || showImageHint
    });

    const loadQuestion = () => {
        const token = Cookies.get("token");
        sendRequest({ token, questionType });
        setUserAnswer("");
        setSuccess(null);
        setShowHint(false);
        setShowImageHint(false);
        setSolutionTime(0);
        startTimeRef.current = Date.now();
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

    const speak = () => {
        const utterance = new SpeechSynthesisUtterance(data?.question);
        utterance.lang = "he-IL";
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    };

    const countWithAudio = async (count) => {
        for (let i = 0; i < count; i++) {
            setActiveImageIndex(i);
            const utterance = new SpeechSynthesisUtterance((i + 1).toString());
            utterance.lang = "he-IL";
            speechSynthesis.speak(utterance);
            await new Promise((resolve) => setTimeout(resolve, 700));
        }
        setActiveImageIndex(null);
    };

    const checkLiteralProblem = async () => {
        await checkAnswer(userAnswer);
        if (success && solutionTime <= 10) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    };

    return (
        <div>
            {showConfetti && <Confetti />}
            {loading && <div>טוען שאלה...</div>}
            {error && <div className="text-red-500">שגיאה: {error}</div>}
            {data && (
                <LiteralProblemExercise
                    question={data.question}
                    svg1={data.svg1}
                    svg2={data.svg2}
                    imageHint={data.imageHint}
                    hint={data.hint}
                    userAnswer={userAnswer}
                    setUserAnswer={setUserAnswer}
                    onCheckAnswer={checkLiteralProblem}
                    onSpeak={speak}
                    onHint={() => setShowHint(!showHint)}
                    onImageHint={() => setShowImageHint(!showImageHint)}
                    showHint={showHint}
                    showImageHint={showImageHint}
                    success={success}
                    countWithAudio={countWithAudio}
                    activeImageIndex={activeImageIndex}
                    solutionTime={solutionTime}
                />
            )}

            <div className="mt-4 text-center">
                <button
                    onClick={loadQuestion}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    שאלה חדשה
                </button>
            </div>
        </div>
    );
}
