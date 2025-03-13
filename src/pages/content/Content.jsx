import "./Content.css";
import useGetApi from "../../hooks/apiHooks/useGetApi.js"; // Rename this hook to match its behavior
import { GET_MATH } from "../../utils/Constants.js";
import {useEffect, useState} from "react";
import "/src/components/Math/Shapes/Shapes.css"
import "/src/components/Math/Exercise/Exercise.css"
import Shape from "/src/components/Math/Shapes/Shape.jsx";
import Cookies from "js-cookie";
export default function Content() {
    const { data, error, loading, sendRequest } = useGetApi(GET_MATH);
    const [userAnswer, setUserAnswer] = useState("");
    const [correct, setCorrect] = useState(null);
    const [num1, setNum1] = useState([]);
    const [num2, setNum2] = useState([]);
    const shapes = ["square", "circle", "triangle"]
    const colors = ["red","yellow","green","purple"]





    const getEx = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendRequest({ token: token, level: 1 }); // שליחת אובייקט תקין
    };


    useEffect(() => {
        if (data) {
            console.log(data.num1);
            setNum1(Array(data.num1).fill(randomizeExerciseProps()));
            setNum2(Array(data.num2).fill(randomizeExerciseProps()));
        }
    }, [data]);

    function randomizeExerciseProps(){
        const randomShape = Math.floor(Math.random() * shapes.length)
        console.log("random shape" + randomShape);
        const randomColor = Math.floor(Math.random() * colors.length)
        console.log("random color" + randomColor);
        return <Shape type={shapes[randomShape]} color={colors[randomColor]}/>
    }



    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value); // עדכון תשובת המשתמש
    };

    const checkAnswer = () => {
        if (data && parseInt(userAnswer) === data.correctAnswer) {
            setCorrect(true);  // אם התשובה נכונה
        } else {
            setCorrect(false);  // אם התשובה לא נכונה
        }
    };

    return (
        <div className={"content-container"}>
            <h1>תרגילים</h1>
            <button onClick={getEx}>הצג תרגיל </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    <div className={"exercise"}>
                        <div className={"shapes-container"}>
                            {num1.map((shape, index) => (
                                <div key={index}>{shape}</div>
                            ))}
                        </div>
                        <label className={"operand"}>{data.operand}</label>
                        <div className={"shapes-container"}>
                            {num2.map((shape, index) => (
                                <div key={index}>{shape}</div>
                            ))}
                        </div>
                        <label className={"operand"}>{data.operandEqual}</label>
                        <input
                            type="number"
                            value={userAnswer}
                            onChange={handleAnswerChange}
                            placeholder="Enter your answer"
                        />
                        <button onClick={checkAnswer}>Check Answer</button>
                    </div>
                    <div>

                    </div>
                    {correct !== null && (
                        <p>{correct ? "Correct!" : "Incorrect. Try again!"}</p>
                    )}
                </div>
            )}
        </div>
    );
}
