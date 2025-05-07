// 📁 src/components/NewMath/AddAndSubIsland/SimpleMath.jsx
import  SimpleExercise from "../ExerciseTypes/SimpleExercise.jsx";
import ExerciseWrapper from "./ExerciseWrapper.jsx";

export default function SimpleMath({ questionType, url }) {

    return (
        <ExerciseWrapper
            questionType={questionType}
            url={url}
            renderComponent={(data, setHint, checkAnswer, level) => (
                <SimpleExercise question={data} setHint={setHint} checkAnswer={checkAnswer} level={level}/>
            )}
        />
    );
}
