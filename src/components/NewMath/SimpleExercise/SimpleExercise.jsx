import React from "react";

export const SimpleExercise = ({ question, checkAnswer }) => {
    const [answer, setAnswer] = React.useState("");

    const handleSubmit = () => {
        onSubmit(answer);
        setAnswer("");
    };

    return (
        <div>
            {
                question !== null &&<div>{question}</div>
            }
            <input type={"text"} value={question} onChange={(event) => setAnswer(event.target.value)} />
        </div>
    );
};