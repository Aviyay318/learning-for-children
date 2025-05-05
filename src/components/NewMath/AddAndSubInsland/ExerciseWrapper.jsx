import SimpleExercise from "../ExerciseTypes/SimpleExercise.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ISLAND_CONFIGS_MAP} from "../../../utils/IslandConfig.js";
import useApi from "../../../hooks/apiHooks/useApi.js";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.js";
import Cookies from "js-cookie";
import {useUser} from "../../../contexts/UserContext.jsx";
import "./AddAndSubIsland.css"
import {GET_LEVEL_OF_ISLAND, GET_USER_OPEN_ISLAND, SERVER_URL} from "../../../utils/Constants.js";
import axios from "axios";

export default function ExerciseWrapper({ questionType, renderComponent, url, customCheckAnswer }) {
    const { islandId } = useParams();
    const island = ISLAND_CONFIGS_MAP[islandId];

    const [loading, setLoading] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [usedClue, setUsedClue] = useState(false);
    const [solutionTime, setSolutionTime] = useState(0);
    const { user, setUser } = useUser();
    const { data, error, sendRequest } = useApi(url, "GET", { minDelay: 0 });
    const { checkAnswer, feedback, showSolution, setShowSolution, resetTimer, startTimeRef } = useAnswerCheck({ questionType, setUser });
    const [level,setLevel]= useState(1);
    const [highestLevel,setHighestLevel]= useState(1);



    const loadNewQuestion = async () => {
        const token = Cookies.get("token");
        if (!token || !questionType) return;

        setShowHint(false);
        setUsedClue(false);
        setLoading(true);

        const result = await sendRequest({ token, questionType });
        console.log("📡 Question received:", result);

        if (result) {
            resetTimer();
            setSolutionTime(0);
        } else {
            console.warn("🛑 Failed to fetch question, response is null");
        }

        setLoading(false);
    };
const getLevel= ()=>{
    const token = Cookies.get("token");
    axios.get(SERVER_URL+GET_LEVEL_OF_ISLAND+"?token="+token+"&islandId="+island.id).then((res) => {
        if (res!==null) {
            console.log(res.data, " =res.data= ")
setLevel(res.data.level)
            setHighestLevel(res.data.highestLevel)
        }
    })
}
    useEffect(() => {
        console.log("⏳ Fetching question...");
        loadNewQuestion();
        getLevel()
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleCheck = async (answer) => {
        if (!data) return;

        // Use a custom answer check if provided (like in LiteralProblem)
        const result = customCheckAnswer
            ? await customCheckAnswer(answer, data)
            : await checkAnswer({ userAnswer: answer, data, usedClue });
        setLevel(result.level.level)
        setHighestLevel(result.level.highestLevel);
console.log("כדי לא לשגע את רם: ",result)
        return result;
    };

    return (
        <div className="simple island-math-container"
             style={{backgroundImage: "url("+`${island.children}`+")"}}
             dir="rtl">
            {loading ? (
                <div>טוען שאלה...</div>
            ) : error ? (
                <div className="text-red-500">שגיאה בטעינה: {error}</div>
            ) : !data ? (
                <div>שאלה לא זמינה כרגע</div>
            ) : (
                <div className="simple island-math-box flex">
                    {/*<SimpleExercise question={data} checkAnswer={handleCheck} />*/}
                    <div>level :{level} | highestLevel: {highestLevel}</div>
                    {renderComponent(data, handleCheck, solutionTime)}

                    <div className="text-sm text-gray-600 mt-2">⏱ זמן פתרון: {solutionTime} שניות</div>

                    {feedback && <div className="text-lg font-semibold text-purple-700">{feedback}</div>}
                    {showSolution && <div className="text-green-800 font-bold">הפתרון הנכון הוא: {data.solution}</div>}
                    {showHint && <div className="text-orange-600 font-medium">טיפ: נסה לפרק את המספרים 🍊</div>}

                    <div className="flex gap-4 mt-4">
                        <button onClick={loadNewQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">שאלה הבאה</button>
                        <button onClick={() => setShowSolution(true)} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded">הצג פתרון</button>
                        <button onClick={() => { setShowHint(true); setUsedClue(true); }} className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded">הצג עזר</button>
                    </div>
                </div>
            )}
        </div>
    );
}
