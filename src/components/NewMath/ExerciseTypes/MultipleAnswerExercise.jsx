import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ExerciseBoard.css"

export default function MultipleAnswerExercise ({ question, options, checkAnswer, solutionTime }) {
    const [selected, setSelected] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleClick = (val) => {
        setSelected(val);
        setShowFeedback(true);
        checkAnswer(val);
        setTimeout(() => setShowFeedback(false), 1000);
    };

    return (
        <div className="exercise-board-container" dir="rtl">
            {question && (
                <div className={"exercise-board flex"}>
                    <div className="exercise-question flex">
                        <label>{question.num1}</label>
                        <label>{question.operator}</label>
                        <label>{question.num2}</label>
                        <label>{question.equalsSign}</label>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {options.map((option, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleClick(option.value)}
                            >
                                {option.value}
                            </button>
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
};
