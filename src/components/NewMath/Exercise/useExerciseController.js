import { useEffect, useState } from "react";
import useApi from "../../../hooks/apiHooks/useApi.js";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.js";
import Cookies from "js-cookie";

export function useExerciseController({ url, questionType, customCheckAnswer, setUser }) {
  const { data, error, sendRequest } = useApi(url, "GET", { minDelay: 0 });
  const { checkAnswer, feedback, showSolution, setShowSolution, resetTimer, startTimeRef, setFeedback } =
    useAnswerCheck({ questionType, setUser });

  const [solutionTime, setSolutionTime] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const timeToCloseMessage = 2000;

  const loadNewQuestion = async () => {
    const token = Cookies.get("token");
    if (!token || !questionType) return;
    setShowSolution(false);
    if (typeof setFeedback === "function") setFeedback(null);
    const result = await sendRequest({ token, questionType });
    if (result) {
      resetTimer();
      setSolutionTime(0);
    }
  };

  const handleCheck = async (answer) => {
    if (!data) return;
    const result = customCheckAnswer
      ? await customCheckAnswer(answer, data)
      : await checkAnswer({ userAnswer: answer, data });

    setCurrentExp(result.progress);
    const wrong = !result.success;
    setIsWrong(wrong);
    setShowFeedback(true);

    if (!wrong) {
      setTimeout(() => {
        setShowFeedback(false);
        loadNewQuestion();
      }, timeToCloseMessage);
    }

    return result;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    data,
    error,
    feedback,
    showFeedback,
    setShowFeedback,
    isWrong,
    showSolution,
    setShowSolution,
    solutionTime,
    currentExp,
    handleCheck,
    loadNewQuestion,
  };
}
