import {useEffect, useState} from "react";
import axios from "axios";
import {CHECK_EXERCISE, SERVER_URL} from "../../../utils/Constants.js";
import Cookies from "js-cookie";

export default function LiteralProblem() {
    const [literalProblem, setLiteralProblem] = useState(null);
    const [userAnswer, setUserAnswer] = useState("");
    const [success, setSuccess] = useState(null);
    const [id, setId] = useState(1);



    const checkLiteralProblem =()=>{
        const token = Cookies.get("token");
        axios.get(SERVER_URL+CHECK_EXERCISE+"?token="+token+"&id="+id+"&answer=" +userAnswer).then(
            response=>{
                console.log(response.data)
                setSuccess(response.data)
            }
        )
    }

    const getLiteralProblem = async () => {
        const token = Cookies.get("token"); // נקרא ישירות מהעוגייה
        console.log(token);
        const response = await axios.get(SERVER_URL + "/get-literal-problem?token=" + token);
        if (response.data !== null) {
            console.log(response.data);
            setLiteralProblem(response.data);
            setId(response.data.id);
        }
    };


    useEffect(() => {
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
             <div>{literalProblem!==null&&<label>{literalProblem.hint}</label>}</div>

            <button onClick={checkLiteralProblem
            }>בדוק פתרון
            </button>

            {success !== null &&
                <label style={{color: success ? "green" : "red"}}>{success ? <label>V</label> :
                    <label>X</label>}</label>}
        </div>
    )
}