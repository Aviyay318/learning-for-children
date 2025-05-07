import {useEffect, useState} from "react";
import ExerciseWrapper from "./ExerciseWrapper.jsx";
import LiteralProblemExercise from "../ExerciseTypes/LiteralProblemExercise.jsx";
import Confetti from "react-confetti";
import {useUser} from "../../../contexts/UserContext.jsx";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.js";

export default function LiteralProblemNew({ questionType, url }) {
    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [showHint, setShowHint] = useState(false);
    const [showImageHint, setShowImageHint] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(null);
    const [solutionTime, setSolutionTime] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const { setUser } = useUser();
    const { checkAnswer, startTimeRef } = useAnswerCheck({ questionType, setUser });

    const customCheck = async (userAnswer, data) => {
        const result = await checkAnswer({
            userAnswer,
            data,
            usedClue: showHint || showImageHint
        });

        const isSuccess = result?.success ?? false;
        setSuccess(isSuccess);
        console.log("suc :", isSuccess);

        if (isSuccess && solutionTime <= 10) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000);
        }

        return result;
    };



    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ExerciseWrapper
            questionType={questionType}
            url={url}
            customCheckAnswer={customCheck}
            renderComponent={(data, checkAnswer) => (
                <>
                    {showConfetti && <Confetti />}
                    <LiteralProblemExercise
                        question={data.question}
                        svg1={data.svg1}
                        svg2={data.svg2}
                        imageHint={data.imageHint}
                        hint={data.hint}
                        userAnswer={userAnswer}
                        setUserAnswer={setUserAnswer}
                        checkAnswer={({ userAnswer }) =>
                            customCheck(userAnswer, data)
                        }
                        onSpeak={() => {
                            const utterance = new SpeechSynthesisUtterance(data?.question);
                            utterance.lang = "he-IL";
                            utterance.rate = 0.9;
                            speechSynthesis.speak(utterance);
                        }}
                        onHint={() => setShowHint(!showHint)}
                        onImageHint={() => setShowImageHint(!showImageHint)}
                        showHint={showHint}
                        showImageHint={showImageHint}
                        success={success}
                        countWithAudio={async (count) => {
                            for (let i = 0; i < count; i++) {
                                setActiveImageIndex(i);
                                const utterance = new SpeechSynthesisUtterance((i + 1).toString());
                                utterance.lang = "he-IL";
                                speechSynthesis.speak(utterance);
                                await new Promise((resolve) => setTimeout(resolve, 700));
                            }
                            setActiveImageIndex(null);
                        }}
                        activeImageIndex={activeImageIndex}
                        solutionTime={solutionTime}
                    />
                </>
            )}
        />
    );
}
