import "./BasicMath.css"
import BasicExercise from "./BasicExercise/BasicExercise.jsx";
import BasicHelper from "./BasicHelper/BasicHelper.jsx";
import {useEffect, useState} from "react";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {GET_MATH} from "../../../utils/Constants.js";
import Cookies from "js-cookie";

export default function BasicMath(){
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
            <div>
                <button onClick={handleExercise}>get-exercise</button>
                {data !== null
                    &&
                    <div className={"basic-exercise-container"}>
                        <BasicExercise
                            num1={data.num1}
                            num2={data.num2}
                            operand1={data.operand1}
                            operandEqual={data.operandEqual}
                            num3={data.num3}
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


        </div>
    )
};