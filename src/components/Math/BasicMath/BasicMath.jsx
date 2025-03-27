import "./BasicMath.css"
import BasicExercise from "./BasicExercise/BasicExercise.jsx";
import BasicHelper from "./BasicHelper/BasicHelper.jsx";
import {useEffect, useRef, useState} from "react";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {CHECK_EXERCISE, GET_MATH, SERVER_URL, TRANSITION} from "../../../utils/Constants.js";
import axios from "axios";
import Cookies from "js-cookie";
import Feedback from "../../Feedback/Feedback.jsx";
import ExpBar from "../../Feedback/ExpBar/ExpBar.jsx";
import {useSound} from "../../../hooks/soundHooks/useSound.js";

export default function BasicMath() {

    const [askForHelp, setAskForHelp] = useState(false);
    const { data: basicData, error: basicError, loading: basicLoading, sendRequest: sendBasicMathRequest } = useGetApi(GET_MATH);
    const [token,setToken] = useState("");
    const [isCorrectAnswer,setIsCorrectAnswer] = useState(null);
    const [userAnswer,setUserAnswer] = useState("");
    const timeOfQuestionShownRef = useRef(null);
    const timeOfAnswerRef = useRef(null);
    const [currentExp, setCurrentExp] = useState(0)
    const [currentLevel, setCurrentLevel] = useState(1)
    const [nextLevel, setNextLevel] = useState(2)
    const maxExp = 100;

    // const [timeOfQuestionShown, setTimeOfQuestionShown] = useState(null);
    // const [timeOfAnswer, setTimeOfAnswer] = useState(null);
    const handleExercise = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendBasicMathRequest({ token: token, level:1}); // שליחת אובייקט תקין
        setUserAnswer("")
        setIsCorrectAnswer(null)
        setAskForHelp(false)
        const now = Date.now()
        timeOfQuestionShownRef.current = now
        console.log("now: ", timeOfQuestionShownRef)
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
        const now = Date.now()
        timeOfAnswerRef.current = now
        console.log("elapsed time: ",Math.round((timeOfAnswerRef.current - timeOfQuestionShownRef.current)/1000))
    }
    function nextExercise () {
        setUserAnswer("")
        return(
            <>
                <button className={"next-exercise"} onClick={handleExercise}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="100px" viewBox="0 -960 960 960" width="100px" fill="#5f6368">
                        <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z"/>
                    </svg>
                </button>
            </>
        )
    }
    function expBar () {
        return<ExpBar
            currentLevel={currentLevel}
            currentExp={currentExp}
            maxExp={maxExp}
            nextLevel={nextLevel}
        />
    }
    return (
        <div className={"basic-math-container"}>
            {basicData === null &&<button onClick={handleExercise} className={"new-exercise-button"}>התחל</button>}
            {

                isCorrectAnswer !== null ?
                    <Feedback
                        prefix={"basicMath"}
                        currentLevel={currentLevel}
                        setCurrentLevel={setCurrentLevel}
                        setNextLevel={setNextLevel}
                        currentExp={currentExp}
                        setCurrentExp={setCurrentExp}
                        maxExp={maxExp}
                        nextLevel={nextLevel}
                        isClueUsed={askForHelp}
                        isWrong={!isCorrectAnswer}
                        responseTime={Math.round((timeOfAnswerRef.current - timeOfQuestionShownRef.current)/1000)}
                        expBar={expBar}
                        nextExercise={nextExercise}
                    />
                    :
                    (basicData !== null
                        &&
                        <div className={"basic-math-exercise-container"}>
                            {expBar()}
                            <BasicExercise
                                id={basicData.id}
                                num1={basicData.num1}
                                num2={basicData.num2}
                                operand1={basicData.operand1}
                                operandEqual={basicData.operandEqual}
                                num3={basicData.num3}
                                userAnswer={userAnswer}
                                setUserAnswer={setUserAnswer}
                                checkAnswer={checkAnswer}
                                isCorrectAnswer={isCorrectAnswer}

                            />

                            <>
                                <button onClick={() => setAskForHelp(!askForHelp)} className={"ask-help-button"}>
                                    הצג עזר
                                </button>
                                {askForHelp &&
                                    <BasicHelper
                                        num1={basicData.num1}
                                        num2={basicData.num2}
                                        operand={basicData.operand1}
                                    />
                                }
                            </>


                        </div>
                    )
            }


        </div>
    )
};