// ✅ AmericanQuestion.jsx - עם אפקטים לצבע, אור, ורטט
import {
    CHECK_EXERCISE,
    GET_EXERCISE_WITH_OPTION,
    SERVER_URL
} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import axios from "axios";
import BasicExercise from "../BasicMath/BasicExercise/BasicExercise.jsx";
import "./AmericanQuestion.css";

export default function AmericanQuestion() {
    const {
        data: americanData,
        sendRequest: sendAmericanRequest
    } = useGetApi(GET_EXERCISE_WITH_OPTION);

    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [buttonColor, setButtonColor] = useState("green");
    const [textColor, setTextColor] = useState("black");

    const changeColor = () => {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;
        return randomColor;
    };

    const isColorDark = (hexColor) => {
        const hex = hexColor.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
        return brightness < 128;
    };

    const getAmericanQuestion = async () => {
        const token = Cookies.get("token");
        await sendAmericanRequest({token: token, level: 1});
    };

    useEffect(() => {
        getAmericanQuestion();
        const newColor = changeColor();
        setButtonColor(newColor);
        setTextColor(isColorDark(newColor) ? "white" : "black");
    }, []);

    const handleChange = (index) => {
        setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
        setAnswer(americanData.option[index]);
        setIsCorrect(null);
    };

    const checkSolution = async () => {
        const token = Cookies.get("token");
        const response = await axios.get(`${SERVER_URL}${CHECK_EXERCISE}?token=${token}&id=${americanData.id}&answer=${americanData.option[selectedIndex]}`);
        if (response !== null) {
            setIsCorrect(response.data);
        }
    };

    return (
        <div className="american-container">
            <h1>בחר את התשובה הרצויה:</h1>

            {americanData &&
                <div className="exercise-box">
                    <BasicExercise id={americanData.id}
                                   num1={americanData.num1}
                                   num2={americanData.num2}
                                   operand1={americanData.operand1}
                                   operandEqual={americanData.operandEqual}
                                   num3={americanData.num3}
                                   userAnswer={answer}
                                   setUserAnswer={setAnswer}
                                   checkAnswer={checkSolution}
                                   isCorrectAnswer={isCorrect}
                    />

                    <div className="options-grid">
                        {americanData.option.map((op, index) => {
                            const isSelected = selectedIndex === index;
                            const correct = isCorrect === true && isSelected;
                            const incorrect = isCorrect === false && isSelected;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleChange(index)}
                                    className={`option-button ${correct ? "correct" : ""} ${incorrect ? "incorrect" : ""}`}
                                    style={{backgroundColor: buttonColor, color: textColor}}
                                >
                                    {op}
                                </button>
                            );
                        })}
                    </div>
                </div>
            }

            {isCorrect !== null && (
                <h1 className="result-text" style={{color: isCorrect ? "green" : "red"}}>
                    {isCorrect ? "✔ תשובה נכונה" : "✘ תשובה שגויה"}
                </h1>
            )}
        </div>
    );
}