import {useEffect, useState} from "react"
import "./BasicExercise.css"
import NumericInput from "./NumericInput.jsx";
import {useSound} from "../../../../hooks/soundHooks/useSound.js";
import {TRANSITION} from "../../../../utils/Constants.js";

export default function BasicExercise({id,num1, num2, operand1, operandEqual, num3, userAnswer, setUserAnswer, checkAnswer, isCorrectAnswer}){

    // const playTransitionSound = useSound(TRANSITION)

    const buildExercise = () => {
        const parts = [
            num1 === null
                ? <NumericInput key='num1' value={userAnswer} onChange={setUserAnswer}/>
                : num1,
            operand1,
            num2 === null
                ? <NumericInput key='num2' value={userAnswer} onChange={setUserAnswer}/>
                : num2,
            operandEqual,
            num3 === null
                ? <NumericInput key='num3' value={userAnswer} onChange={setUserAnswer}/>
                : num3
        ];
        return (
                <div className={"basic-exercise-container flex"}>
                    {parts.map((part, index) => (
                        <span key={index}>
                        {
                                <div className={"basic-exercise-numeric"}>{part}</div>
                        }
                    </span>
                    ))}
                    {!isCorrectAnswer && <button className={"check-answer-button"}  onClick={() => checkAnswer()} disabled={userAnswer === "" }>
                        הגש <br/>תשובה
                    </button>}
                </div>
        );
    };


    return (
        <div className={"basic-exercise flex"}>
            {buildExercise()}
        </div>


    )
};