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
    const { data, error, loading, sendRequest } = useGetApi(GET_MATH);

    const handleExercise = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendRequest({ token: token, level:1}); // שליחת אובייקט תקין
    };

    useEffect(() => {
        console.log(data)
    },[data])

    return (
        <div className={"basic-math-container"}>
            {data === null &&<button onClick={handleExercise}>התחל</button>}
                {data !== null
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
                        <button
                            onClick={() => setAskForHelp(!askForHelp)}>
                            הצג עזר
                        </button>
                        {askForHelp &&
                            <BasicHelper
                                num1={data.num1}
                                num2={data.num2}
                                operand={data.operand1}
                            />
                        }
                    </div>}
        </div>
    )
};