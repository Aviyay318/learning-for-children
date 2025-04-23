import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { CompleteTheBoardExercise } from "../ExerciseTypes/CompleteTheBoardExercise.jsx";

export default function CompleteTheBoardNew  ({ questionType,url }) {
    const { data, error, loading, sendRequest } = useGetApi(url);
    const fetchQuestions = () => {
        const token = Cookies.get("token");
        sendRequest({ token, questionType });
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    return (
        <div className="p-6">
            {loading && <div>טוען שאלות...</div>}
            {error && <div className="text-red-500">שגיאה: {error}</div>}
            {data?.exercises?.length > 0 && (
                <CompleteTheBoardExercise
                    questions={data.exercises}
                    onRestart={() => {
                        fetchQuestions();
                    }}
                />
            )}
        </div>
    );
};
