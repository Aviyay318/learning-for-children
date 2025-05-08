import { useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {SERVER_URL} from "../../utils/Constants.js";

export default function useAnswerCheck({ questionType, setUser }) {
    const [feedback, setFeedback] = useState("");
    const [showSolution, setShowSolution] = useState(false);
    const startTimeRef = useRef(Date.now());
    const [islandOpen, setIslandOpen] = useState(null)

    const checkAnswer = async ({ userAnswer, data, usedClue = false }) => {
        const token = Cookies.get("token");
        if (!token || !data) return;

        const time = Math.floor((Date.now() - startTimeRef.current) / 1000);

        try {
            const response = await axios.get(`${SERVER_URL}/api/islands/check-exercise`, {
                params: {
                    token,
                    exerciseId: data.id,
                    answer: userAnswer,
                    solution_time: time,
                    usedClue,
                    questionType,
                },
            });

            const result = response.data;
            setFeedback(result.message);
            setUser && setUser({ user: result.user, isVerified: true });


            if (result.islandOpen) {
                setIslandOpen(result.islandOpen)
                // alert(result.islandOpen);
            }
            if (result.message === "wrong answer") {
                setShowSolution(true);
            }

            return result;
        } catch (error) {
            console.error("שגיאה בבדיקה מול השרת:", error);
            setFeedback("שגיאה בבדיקה מול השרת");
        }
    };

    const resetTimer = () => {
        startTimeRef.current = Date.now();
    };

    return {
        checkAnswer,
        feedback,
        showSolution,
        setShowSolution,
        resetTimer,
        startTimeRef,
        setFeedback,
        islandOpen
    };
}
