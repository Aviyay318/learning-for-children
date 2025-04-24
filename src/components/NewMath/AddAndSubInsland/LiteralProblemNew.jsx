import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import Confetti from "react-confetti";
import LiteralProblemExercise from "../ExerciseTypes/LiteralProblemExercise.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { useUser } from "../../../contexts/UserContext.jsx";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.js";

export default function LiteralProblemNew({ questionType, url }) {
    const { data, error, loading, sendRequest } = useGetApi(url);
    const { user, setUser } = useUser();

    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showImageHint, setShowImageHint] = useState(false);
    const [solutionTime, setSolutionTime] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(null);

    const startTimeRef = useRef(Date.now());

    // נוודא שה-hook נוצר רק כשיש את הנתונים הדרושים
    const { checkAnswer } = useAnswerCheck({
        questionType,
        setUser,
        userAnswer,
        data,
        usedClue: showHint || showImageHint,
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

    const handleCheck = async () => {
        const result = await checkAnswer({ userAnswer, data, usedClue: showHint || showImageHint });
        setSuccess(result?.success);

        if (result?.success && solutionTime <= 10) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }
    };


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
                    onCheckAnswer={handleCheck}
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
