import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export const CompleteTheBoardExercise = ({
                                             question = "",
                                             options = [],
                                             correctIndex,
                                             onNext
                                         }) => {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [feedback, setFeedback] = useState("");
    const timeoutRef = useRef(null);

    const handleClick = (index) => {
        setSelectedIndex(index);
        const isCorrect = index === correctIndex;

        setFeedback(isCorrect ? "✔ תשובה נכונה!" : "✖ נסה שוב");
        if (!isCorrect && navigator.vibrate) navigator.vibrate(200);

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setSelectedIndex(null);
            setFeedback("");
            onNext();
        }, isCorrect ? 1500 : 1000);
    };

    if (!question || !Array.isArray(options)) return null;

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="text-2xl font-bold text-blue-800">{question}</div>

            <div className="grid grid-cols-4 gap-4 mt-4">
                {options.map((opt, i) => {
                    const isSelected = selectedIndex === i;
                    const isCorrect = selectedIndex === correctIndex;
                    const isWrong = isSelected && !isCorrect;

                    return (
                        <motion.button
                            key={i}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleClick(i)}
                            className={clsx(
                                "w-20 h-20 rounded-full text-xl font-bold shadow transition duration-300",
                                isSelected && i === correctIndex && "bg-green-500 text-white animate-flash",
                                isWrong && "bg-red-400 animate-shake text-white",
                                !isSelected && "bg-white hover:bg-blue-100"
                            )}
                        >
                            {opt}
                        </motion.button>
                    );
                })}
            </div>

            <div className="text-lg text-purple-700 font-semibold">{feedback}</div>

            <button
                onClick={onNext}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
                שאלה הבאה
            </button>
        </div>
    );
};
