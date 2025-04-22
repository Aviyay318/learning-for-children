import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const MultipleAnswerExercise = ({ question, options, checkAnswer, solutionTime }) => {
    const [selected, setSelected] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleClick = (val) => {
        setSelected(val);
        setShowFeedback(true);
        checkAnswer(val);
        setTimeout(() => setShowFeedback(false), 1000);
    };

    return (
        <div className="p-6 border-2 border-blue-200 rounded-2xl shadow-lg bg-white w-full max-w-md mx-auto text-center" dir="rtl">
            {question && (
                <>
                    <div className="text-2xl font-extrabold text-blue-700 mb-6">{question}</div>

                    <div className="mb-4 text-sm text-gray-500">
                        ⏱ זמן פתרון: {solutionTime} שניות
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-6">
                        {options.map((option, idx) => (
                            <motion.button
                                key={idx}
                                onClick={() => handleClick(option.value)}
                                whileTap={{ scale: 0.9 }}
                                className={`bg-white border border-gray-300 text-blue-900 text-xl font-bold w-16 h-16 rounded-full hover:bg-blue-100 transition duration-200 shadow ${
                                    selected === option.value ? "ring ring-green-400" : ""
                                }`}
                            >
                                {option.value}
                            </motion.button>
                        ))}
                    </div>
                </>
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
