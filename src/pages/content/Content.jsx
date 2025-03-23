import "./Content.css";
import useGetApi from "../../hooks/apiHooks/useGetApi.js"; // Rename this hook to match its behavior
import {GET_MATH, SERVER_URL} from "../../utils/Constants.js";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import BasicMath from "../../components/Math/BasicMath/BasicMath.jsx";
import ExerciseTabs from "../../components/Math/Exercise/ExerciseTabs.jsx";
import axios from "axios";
export default function Content() {
    const { data, error, loading, sendRequest } = useGetApi(GET_MATH);
    const [userAnswer, setUserAnswer] = useState("");
    const [correct, setCorrect] = useState(null);


    const [level, setLevel] = useState(null);

    const getLevel = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                console.error("Token is missing!");
                return;
            }

            const response = await axios.get(`${SERVER_URL}/get-level`, {
                params: { token }
            });

            if (response.data !== null) {
                console.log("User level:", response.data);
                setLevel(response.data); // שמירת הרמה ב-state
            }
        } catch (error) {
            console.error("Error fetching level:", error);
        }
    };

    useEffect(() => {
        getLevel();
    }, []);

    const getEx = async () => {
        const token = Cookies.get("token"); // קבלת הטוקן מה-Cookie
        await sendRequest({ token: token, level: 1}); // שליחת אובייקט תקין
    };



    const handleAnswerChange = (event) => {
        setUserAnswer(event.target.value); // עדכון תשובת המשתמש
    };

    const checkAnswer = () => {
        if (data && parseInt(userAnswer) === data.correctAnswer) {
            setCorrect(true);  // אם התשובה נכונה
        } else {
            setCorrect(false);  // אם התשובה לא נכונה
        }
    };

    return (
        <div className={"content-container flex"}>
            <div className={"content-header header glass"}>
                <h1>תרגילים</h1>
            </div>
            <div className={"content-body flex glass"}>
                <h1>User Level: {level !== null ? level : "Loading..."}</h1>
                <ExerciseTabs/>
            </div>
        </div>
    );
}
