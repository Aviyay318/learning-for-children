import "./Feedback.css";
import { useEffect, useState } from "react";
import { feedbackConfig } from "./feedbackConfig.js";
import Confetti from "react-confetti";
import StarRating from "./StarRating/StarRating.jsx";
import { useSound } from "../../hooks/soundHooks/useSound.js";
import { useSoundSequence } from "../../hooks/soundHooks/useSoundSequence.js";
import { LEVEL_UP } from "../../utils/Constants.js";

export default function Feedback({
                                     prefix,
                                     currentLevel,
                                     setCurrentLevel,
                                     setNextLevel,
                                     currentExp,
                                     setCurrentExp,
                                     maxExp,
                                     nextLevel,
                                     responseTime,
                                     isClueUsed,
                                     isWrong,
                                     expBar,
                                     nextExercise,
                                 }) {
    const [stars, setStars] = useState(0);
    const totalStars = 3;
    const [message, setMessage] = useState("");
    const [outcome, setOutcome] = useState("");
    const [hasLeveledUp, setHasLeveledUp] = useState(false);
    const [showExpBar, setShowExpBar] = useState(false);
    const config = feedbackConfig;

    const handleOutcome = () => {
        if (isWrong) {
            setOutcome("wrong");
        } else if (isClueUsed) {
            setOutcome("usedAClue");
        } else if (responseTime <= config.optimal.maxTime) {
            setOutcome("optimal");
        } else if (responseTime <= config.regular.maxTime) {
            setOutcome("regular");
        } else {
            setOutcome("delayed");
        }
    };

    useEffect(() => {
        handleOutcome();
    }, [responseTime, isClueUsed, isWrong]);

    const handleAnswer = () => {
        const { exp, stars, message } = feedbackConfig[outcome || "wrong"];
        let newExp = Math.ceil(currentExp + exp);
        if (newExp >= maxExp) {
            newExp = newExp - maxExp;
            setCurrentLevel(currentLevel + 1);
            setNextLevel(currentLevel + 2);
            setHasLeveledUp(true);
        }
        setCurrentExp(newExp);
        setStars(stars);
        setMessage(message);
    };

    useEffect(() => {
        handleAnswer();
    }, [outcome]);

    // Use our sequence hook to chain sounds
    // const playSoundSequence = useSoundSequence();

    // useEffect(() => {
    //     if (outcome) {
    //         // Build an array of sounds to play:
    //         // First, always play the outcome sound from config.
    //         // If the user leveled up, then play the level-up sound afterward.
    //         const soundsToPlay = [config[outcome]?.sound];
    //         if (hasLeveledUp) {
    //             soundsToPlay.push(LEVEL_UP);
    //         }
    //         playSoundSequence(soundsToPlay)
    //             .then(() => {
    //                 // Optionally, do something after the sequence finishes
    //                 console.log("Sound sequence complete");
    //             })
    //             .catch((err) => console.error("Sound sequence error:", err));
    //     }
    // }, [outcome, hasLeveledUp, config, playSoundSequence]);
    //

    return (
        <div className="feedback-container flex">
            <label className="feedback-message">{message}</label>
            <StarRating
                earnedStars={stars}
                totalStars={totalStars}
            />
            {hasLeveledUp && <Confetti />}
            {expBar()}
            {nextExercise()}
        </div>
    );
}
