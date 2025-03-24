import "./BasicMath.css"
import BasicExercise from "./BasicExercise/BasicExercise.jsx";
import BasicHelper from "./BasicHelper/BasicHelper.jsx";
import {useEffect, useState} from "react";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {CHECK_EXERCISE, GET_MATH, SERVER_URL} from "../../../utils/Constants.js";
import axios from "axios";
import Cookies from "js-cookie";

export default function BasicMath() {

    const [askForHelp, setAskForHelp] = useState(false);
    const { data: basicData, error: basicError, loading: basicLoading, sendRequest: sendBasicMathRequest } = useGetApi(GET_MATH);
    const [token,setToken] = useState("");
    const [isCorrectAnswer,setIsCorrectAnswer] = useState(null);
    const [userAnswer,setUserAnswer] = useState("");

    const handleExercise = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendBasicMathRequest({ token: token, level:1}); // שליחת אובייקט תקין
        setUserAnswer("")
        setIsCorrectAnswer(null)
    };

    useEffect(() => {
        console.log(basicData)
    },[basicData])

    useEffect(()=>{
        const token = Cookies.get("token");
        setToken(token);
    },[])

    const checkAnswer =()=>{
        axios.get(SERVER_URL+CHECK_EXERCISE+"?token="+token+"&id="+basicData.id+"&answer=" +userAnswer).then(
            response=>{
                setIsCorrectAnswer(response.data)
            }
        )
    }
    return (
        <div className={"basic-math-container"}>
            {basicData === null &&<button onClick={handleExercise}>התחל</button>}
                {basicData !== null
                    &&
                    <div className={"basic-exercise-container"}>
                        <BasicExercise
                            id={basicData.id}
                            num1={basicData.num1}
                            num2={basicData.num2}
                            operand1={basicData.operand1}
                            operandEqual={basicData.operandEqual}
                            num3={basicData.num3}
                            userAnswer={userAnswer}
                            setUserAnswer={setUserAnswer}
                        />
                        <button onClick={checkAnswer}>בדוק תשובה</button>
                        {
                            isCorrectAnswer !== null &&
                            <label style={{color: isCorrectAnswer ? "green" : "red"}}>{isCorrectAnswer ?
                                <div>
                                    <button onClick={handleExercise}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                                            <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                                        </svg>
                                    </button>
                                    <label>V</label>
                                </div> :
                                <label>X</label>}</label>
                        }

                        <div>
                            <button
                                onClick={() => setAskForHelp(!askForHelp)}>
                                הצג עזר
                            </button>
                            {askForHelp &&
                                <BasicHelper
                                    num1={basicData.num1}
                                    num2={basicData.num2}
                                    operand={basicData.operand1}
                                />
                            }
                        </div>


                    </div>}
        </div>
    )
};