
import {GET_EXERCISE_WITH_OPTION, GET_MATH, REGISTER_PAGE} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import {data} from "react-router-dom";
import {useEffect} from "react";

export default function AmericanQuestion() {
    const {
        data: americanData,
        error: americanError,
        loading: americanLoading,
        sendRequest: sendAmericanRequest
    } = useGetApi(GET_EXERCISE_WITH_OPTION);


    const getAmericanQuestion = async ()=> {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        // TODO להוסיף את הפונקציה של הLEVEL
        await sendAmericanRequest({token: token, level: 1}); // שליחת אובייקט תקין
        // console.log(americanData);
    }


    useEffect(()=>{
      getAmericanQuestion();
    },[])

        return (

    <div>
        <h1>בחר את התשובה הרצויה:</h1>
        {
            americanData !== null &&
            <div>
                {
                    americanData.option.map((op, index) => {
                        return (
                            <div key={index}>
                                <label>{op}</label>
                                <input  type={"radio"}/>
                            </div>
                        )
                    })
                }
            </div>
        }


    </div>
        )
            ;

}