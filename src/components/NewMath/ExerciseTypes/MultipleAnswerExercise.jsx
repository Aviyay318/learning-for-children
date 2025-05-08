import React, {useState, useMemo, useEffect} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ExerciseBoard.css"
import "./MultiAnswerExercise.css";
import { buttonColorClassMap } from "../../../utils/ButtonConstants.js";

// simple in-place shuffle (Durstenfeld algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function MultipleAnswerExercise({
                                                   question,
                                                   options,
                                                   checkAnswer,
                                                   solutionTime,
                                               }) {
    const [selected, setSelected] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleClick = (val) => {
        setSelected(val);
        setShowFeedback(true);
        console.log("val : ",val)
        checkAnswer(val);
        setTimeout(() => setShowFeedback(false), 1000);
    };

    const palette = [
        buttonColorClassMap.green,
        buttonColorClassMap.yellow,
        buttonColorClassMap.blue,
        buttonColorClassMap.white,
        buttonColorClassMap.orange,
        buttonColorClassMap.pink,
    ];

    // shuffle once per question change, then take as many as we need
    function getNewButtonColor(){
        const randomIndex = Math.floor(Math.random() * palette.length);
        return palette[randomIndex];
    }

    return (
        <div className="exercise-board-container" dir="rtl">
            {question && (
                <div className="exercise-board-box flex">
                    <div className="multiple-board flex">
                        <div className="multiple-question flex">
                            <label>{question.num1}</label>
                            <label>{question.operator}</label>
                            <label>{question.num2}</label>
                            <label>{question.equalsSign}</label>
                        </div>
                    </div>
                    <div className="options-button-box flex">
                        {options.map((option, idx) => (
                            <>
                                <button
                                    key={idx}
                                    className={`option-button ${buttonColorClassMap.yellow}`}
                                    onClick={() => handleClick(option.value)}
                                >
                                    {option.value}
                                </button>
                            </>

                        ))}
                    </div>
                </div>
            )}

            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        key="feedback"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-green-600 font-bold text-lg"
                    >
                        תשובה נבחרה!
                    </motion.div>
                )}
            </AnimatePresence>

            {!question && <div className="text-gray-500">לא נטענה שאלה...</div>}
        </div>
    );
}
