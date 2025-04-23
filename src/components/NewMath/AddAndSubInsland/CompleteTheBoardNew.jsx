import React, { useEffect } from "react";
import Cookies from "js-cookie";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import { CompleteTheBoardExercise } from "../ExerciseTypes/CompleteTheBoardExercise.jsx";

export const CompleteTheBoardNew = ({ questionType }) => {
    const { data, error, loading, sendRequest } = useGetApi("/api/islands/Addition-and-subtraction");

    useEffect(() => {
        const token = Cookies.get("token");
        sendRequest({ token, questionType });
    }, []);

    return (
        <div className="p-6">
            {loading && <div>טוען שאלה...</div>}
            {error && <div className="text-red-500">שגיאה: {error}</div>}
            {data?.options && (
                <CompleteTheBoardExercise
                    question={`${data.num1} ${data.operator} ${data.num2} = ?`}
                    options={data.options}
                    correctIndex={data.correctIndex}
                    onNext={() => {
                        const token = Cookies.get("token");
                        sendRequest({ token, questionType });
                    }}
                />
            )}
        </div>
    );
};
