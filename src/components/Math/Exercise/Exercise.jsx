import {useEffect, useState} from "react";
import axios from "axios";
import {GET_MATH, SERVER_URL} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";

export default function Exercise(){
    const { data, error, loading, sendRequest } = useGetApi(GET_MATH);
    const [answerNumber,setAnswerNumber] = useState("");

    const handleExercise = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendRequest({ token: token, level: 1 }); // שליחת אובייקט תקין
    };

    useEffect(() => {
        console.log(data)
    },[data])

   const buildExercise=()=>{
        if (data.num1===null){
           return  <div>
              <input type={"number"} onChange={(e)=>setAnswerNumber(e.target.value)}/>
               <label></label>
           </div>
        }
   }


    return (
        <div>
            <button onClick={handleExercise}>get-exercise</button>
        </div>
    )
}