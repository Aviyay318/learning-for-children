import {useEffect, useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../../utils/Constants.js";
import Cookies from "js-cookie";

export default function LiteralProblem() {
    const [literalProblem, setLiteralProblem] = useState(null);
    const [token,setToken] = useState();
    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [id, setId] = useState(1);


    const checkLiteralProblem = async ()=>{
      const  response = await axios.get(SERVER_URL + "/check-literal-problem?token=" + token + "&id=" + id);
        if (response.data!==null){
             console.log(response.data);
             setSuccess(response.data);
        }
    };

    const getLiteralProblem = async () => {
        const response = await axios.get(SERVER_URL + "/get-literal-problem?token=" + token);
        if (response.data!==null){
            console.log(response.data); // assuming 'response.regData' contains the question
            setLiteralProblem(response.data);
            // setId(response.regData.id);
        }
    };

    useEffect(() => {
        setToken(Cookies.get("token"))
        getLiteralProblem();
    }, []);

    return (
        <div>
            <label>בעיה מילולית:</label>
            {literalProblem !== null && <label >{literalProblem.question}</label>
            }
            <div><input type={"number"} value={userAnswer} onChange={(e) => {
                setUserAnswer(e.target.value)
            }} placeholder={"הכנס כאן"}/>
            </div>
            <button onClick={() => window.confirm("האם אתה בטוח?") ? alert("כן") : alert("לא")}>
             רמז
            </button>
             {/*<div>{literalProblem.hint}</div>*/}

            <button onClick={() => {
                checkLiteralProblem(userAnswer)
            }}>בדוק פתרון
            </button>

            {success !== null &&
                <label style={{color: success ? "green" : "red"}}>{success ? <label>V</label> :
                    <label>X</label>}</label>}
        </div>
    )
}