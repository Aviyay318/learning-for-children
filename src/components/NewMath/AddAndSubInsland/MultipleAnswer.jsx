import React from "react";
import ExerciseWrapper from "./ExerciseWrapper.jsx";
import MultipleAnswerExercise from "../ExerciseTypes/MultipleAnswerExercise.jsx";

export default function MultipleAnswer({ questionType, url }) {
    return (
        <ExerciseWrapper
            questionType={questionType}
            url={url}
            renderComponent={(data, checkAnswer) => {
                const options = data.options?.map((val) => ({ value: val })) || [];
                return (
                    <MultipleAnswerExercise
                        question={data}
                        options={options}
                        checkAnswer={checkAnswer}
                    />
                );
            }}
        />
    );
}
