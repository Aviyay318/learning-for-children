import {useState} from "react"
import "./BasicExercise.css"
export default function BasicExercise({num1, num2, operand1, operandEqual, num3}){
    const [answerNumber,setAnswerNumber] = useState("");

    const buildExercise = () => {
        const parts = [
            num1 === null ? <input key="num1" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : num1,
            operand1,
            num2 === null ? <input key="num2" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : num2,
            operandEqual,
            num3 === null ? <input key="num3" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : num3
        ];

        return (
            <div className="basic-exercise-numeric flex">
                {parts.map((part, index) => (
                    <span key={index}>{part}</span>
                ))}
            </div>
        );
    };


    return (
        <div>
            {buildExercise()}
        </div>
    )
} ;