import React from "react";
import ExerciseWrapper from "./ExerciseWrapper.jsx";
import { CompleteTheBoardExercise } from "../ExerciseTypes/CompleteTheBoardExercise.jsx";

export default function CompleteTheBoardNew({ questionType, url }) {
    return (
        <ExerciseWrapper
            questionType={questionType}
            url={url}
            renderComponent={(data, checkAnswer) => (
                <CompleteTheBoardExercise
                    questions={data.exercises}
                    onCheckAnswer={checkAnswer}
                    onRestart={() => checkAnswer(null)}
                />
            )}
        />
    );
}
