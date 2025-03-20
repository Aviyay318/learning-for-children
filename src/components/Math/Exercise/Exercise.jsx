import {useEffect, useState} from "react"
import {GET_MATH, SERVER_URL} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import "./Exercise.css"

export default function Exercise(){
    const { data, error, loading, sendRequest } = useGetApi(GET_MATH);
    const [answerNumber,setAnswerNumber] = useState("");

    const handleExercise = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendRequest({ token: token, level:4}); // שליחת אובייקט תקין
    };

    useEffect(() => {
        console.log(data)
    },[data])
    const buildExercise = () => {
        const parts = [
            data.num1 === null ? <input key="num1" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : data.num1,
            data.operand1,
            data.num2 === null ? <input key="num2" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : data.num2,
            data.operandEqual,
            data.num3 === null ? <input key="num3" type="number" value={answerNumber} onChange={(e) => setAnswerNumber(Number(e.target.value))} className="basic-exercise-input" /> : data.num3
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
            <button onClick={handleExercise}>get-exercise</button>
            {data!==null&&buildExercise()}
        </div>
    )
} ;