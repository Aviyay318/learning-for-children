
import {
    CHECK_EXERCISE,
    GET_EXERCISE_WITH_OPTION,
    GET_MATH,
    REGISTER_PAGE,
    SERVER_URL
} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import {data} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import BasicExercise from "../BasicMath/BasicExercise/BasicExercise.jsx";

export default function AmericanQuestion() {
    const {
        data: americanData,
        error: americanError,
        loading: americanLoading,
        sendRequest: sendAmericanRequest
    } = useGetApi(GET_EXERCISE_WITH_OPTION);

    const[selectedIndex, setSelectedIndex] = useState(null);
    const [isCorrect,setIsCorrect]= useState(null);
    const [answer, setAnswer] = useState(null); //americanData.option[selectedIndex] זה מה שמחליף את ANSWER אם רם ימחק את BasicExercise


    const getAmericanQuestion = async ()=> {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        // TODO להוסיף את הפונקציה של הLEVEL
        await sendAmericanRequest({token: token, level: 1}); // שליחת אובייקט תקין
        // console.log(americanData);
    }


    useEffect(()=>{
      getAmericanQuestion();
    },[])

    const handleChange = (index) => {
        setSelectedIndex(prevIndex => (prevIndex === index ? null : index));
        setAnswer(americanData.option[index])
    };

    const checkSolution=async ()=>{
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        const response= await axios.get(SERVER_URL+CHECK_EXERCISE+"?token="+token+"&id="+americanData.id+"&answer="+americanData.option[selectedIndex]);
        if (response!==null){
        setIsCorrect(response.data);
        }
    }

        return (

    <div>
        <h1>בחר את התשובה הרצויה:</h1>

        {
            americanData !== null &&
            <div>
                <BasicExercise id={americanData.id} num1={americanData.num1} num2={americanData.num2} operand1={americanData.operand1} operandEqual={americanData.operandEqual} num3={americanData.num3} userAnswer={answer} setUserAnswer={setAnswer} checkAnswer={checkSolution} isCorrectAnswer={isCorrect} />
                {
                    americanData.option.map((op, index) => {
                        return (
                            <div key={index}>
                                <label>{op}</label>
                                <input  type={"radio"}
                                        checked={selectedIndex === index}
                                        onChange={() => handleChange(index)}
                                />
                            </div>
                        )
                    })
                }
                {/*<button disabled={selectedIndex===null} onClick={checkSolution}>הגש פתרון</button>*/}
            </div>
        }

        {
            isCorrect!==null && <h1 style={{color:isCorrect? "green": "red"}}> {isCorrect?<label>V</label>:<label>X</label>}</h1>
        }
    </div>
        )
            ;

}