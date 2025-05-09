import SimpleExercise from "../ExerciseTypes/SimpleExercise.jsx";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ISLAND_CONFIGS_MAP} from "../../../utils/IslandConfig.js";
import useApi from "../../../hooks/apiHooks/useApi.js";
import useAnswerCheck from "../../../hooks/apiHooks/useAnswerCheck.js";
import Cookies from "js-cookie";
import {useUser} from "../../../contexts/UserContext.jsx";
import "./AddAndSubIsland.css"
import NextQuestion from "/src/assets/images/Islands/Props/ExercisePage/next_question.png"
import TakeHint from "/src/assets/images/Islands/Props/ExercisePage/take_hint.png"
import Canvas from "/src/assets/images/Islands/Props/ExercisePage/canvas.png"
import RevealAnswer from "/src/assets/images/Islands/Props/ExercisePage/reveal_answer.png"
import ExerciseGuide from "/src/assets/images/Islands/Props/Guide/game_guide.png"
import Modal from "../../Modal/Modal.jsx";
import axios from "axios";
import {GET_GUIDE, GET_GUIDE_FOR_ISLAND, GET_LEVEL_OF_ISLAND, SERVER_URL} from "../../../utils/Constants.js";
import Guide from "../../Guide/Guide.jsx";
import time from "/src/assets/images/Islands/Props/ExercisePage/time.png"
import useUserLevels from "../../../hooks/apiHooks/useUserLevels.js";
import ExpBar from "../../Feedback/ExpBar/ExpBar.jsx";
import Confetti from "react-confetti";
import SimpleFeedback from "../../SimpleFeedback/SimpleFeedback.jsx";

export default function ExerciseWrapper({ questionType, haveHint=true,haveSolution=true,renderComponent, url, customCheckAnswer }) {
    const { islandId } = useParams();
    const island = ISLAND_CONFIGS_MAP[islandId];

    const [loading, setLoading] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [usedClue, setUsedClue] = useState(false);
    const [solutionTime, setSolutionTime] = useState(0);
    const [hint, setHint] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [showCanvas, setShowCanvas] = useState(false);

    const [showFeedback, setShowFeedback] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const { user, setUser } = useUser();

    const { data, error, sendRequest } = useApi(url, "GET", { minDelay: 0 });
    const { checkAnswer, feedback, showSolution, setShowSolution, resetTimer, startTimeRef,setFeedback, islandOpen } = useAnswerCheck({ questionType, setUser });
    const { levels, loading: levelsLoading } = useUserLevels();
    const myLevelObj = levels.find(l => l.island.id === island.id);
    const myLevel    = myLevelObj?.level ?? 1;
    const [level,setLevel]= useState(1);
    const [highestLevel,setHighestLevel]= useState(1);

    const [rightHovered, setRightHovered] = useState(false);
    const [leftHovered,  setLeftHovered]  = useState(false);

    const [showGuide, setShowGuide] = useState(false);

    const timeToCloseMessage = 2000;

    const loadNewQuestion = async () => {
        const token = Cookies.get("token");
        if (!token || !questionType) return;


        setShowHint(false);
        setShowSolution(false);
        setHint(null);
        setUsedClue(false);
        if (typeof setFeedback === "function") setFeedback(null);

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


    const loadProgress =()=>{
        const token = Cookies.get("token")
        axios.get(SERVER_URL+"/api/islands/progress?token="+token+"&level="+level+"&islandId="+island.id).then(
            (res) => {
                console.log("rammm:  ",res.data)
                setCurrentExp(res.data.progress)
            })
    }
    useEffect(() => {
        console.log("⏳ Fetching question...");
        loadProgress()
        loadNewQuestion();
        getLevel()
    }, []);


    useEffect(() => {
        const interval = setInterval(() => {
            setSolutionTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const [currentExp, setCurrentExp] = useState(null)
    const handleCheck = async (answer) => {
        if (!data) return;

        const result = customCheckAnswer
            ? await customCheckAnswer(answer, data)
            : await checkAnswer({ userAnswer: answer, data, usedClue });

        setLevel(result.level.level);
        setHighestLevel(result.level.highestLevel);
        setCurrentExp(result.progress)

        const wrong = !result.success;
        setIsWrong(wrong);
        setShowFeedback(true);

        if (!wrong) {
            // correct: auto-close in 1s & next question
            setTimeout(() => {
                setShowFeedback(false);
                loadNewQuestion();
            }, timeToCloseMessage);
        }
        //
        // console.log("כדי לא לשגע את רם: ", result);
        // //TODO FOR RAM REVIVO
        // if (result?.success) {
        //     alert("כל הכבוד! תשובה נכונה 🎉");
        //     setTimeout(() => {
        //         loadNewQuestion();
        //     }, 500);
        // }else {
        //     alert(data.solution
        //     +"טעית התשובה נכונה היא 🎉");
        //     console.log("try: ,solutionMethod: "+data.solutionMethod)
        //     setTimeout(() => {
        //         loadNewQuestion();
        //     }, 500);
        // }

        return result;
    };




    return (
        <div className="simple island-math-container flex"
            // style={{backgroundImage: "url("+`${island.children}`+")"}}
             dir="rtl">
            {loading ? (
                <div>טוען שאלה...</div>
            ) : error ? (
                <div className="text-red-500">שגיאה בטעינה: {error}</div>
            ) : !data ? (
                <div>שאלה לא זמינה כרגע</div>
            ) : (
                <div className="simple island-math-box flex">
                    {showFeedback && (
                        <SimpleFeedback
                            message={
                                isWrong
                                    ?<p>{"טעית, תשובה שגויה - התשובה הנכונה היא " + data.solution}</p>

                                    : "כל הכבוד, תשובה נכונה"
                            }
                            color={isWrong ? "red" : "green"}
                            autoCloseTime={isWrong ? null : 2000}
                            onClose={() => {
                                setShowFeedback(false);
                                if (isWrong) loadNewQuestion();
                            }}
                        />
                    )}
                    {
                        islandOpen &&
                        <SimpleFeedback
                            message={
                            `האי ${islandOpen} נפתח!`
                            }
                            color={"green"}
                            autoCloseTime={isWrong ? null : 1000}
                            onClose={() => {
                                setShowFeedback(false);
                                if (isWrong) loadNewQuestion();
                            }}
                        />
                    }
                    <Modal
                        title="רמז"
                        component={hint}
                        showModal={showHint}
                        setShowModal={setShowHint}
                    />
                    <Modal
                        title="לוח"
                        component={canvas}
                        showModal={showCanvas}
                        setShowModal={setShowCanvas}
                    />
                    <Modal
                        title="הוראות"
                        component={<Guide url={GET_GUIDE_FOR_ISLAND} payload={{islandId: island.id}}/>}
                        showModal={showGuide}
                        setShowModal={setShowGuide}
                    />
                    <div className={"exercise-right-container flex"}
                         onClick={loadNewQuestion}
                         onMouseEnter={()=> setRightHovered(true)}
                         onMouseLeave={()=> setRightHovered(false)}
                         style={{backgroundImage: "url("+`${rightHovered?island.child1Happy:island.child1}`+")"}}>
                        {rightHovered && <img className={"exercise-page-prop-images"} src={NextQuestion} alt="NextQuestion" />}
                        {/*<button  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">שאלה הבאה</button>*/}
                    </div>
                    <div className={"exercise-middle-container"}>
                        <img
                            className={"clickable exercise-guide"}
                            onClick={() => setShowGuide(true)}
                            src={ExerciseGuide}
                            alt={"guide"}
                        />
                        <div className="exercise-time flex">
                            <img src={time} alt={"time"}/>
                            <label >
                                {solutionTime} שניות
                            </label>
                        </div>
                        {/*<SimpleExercise question={data} checkAnswer={handleCheck} />*/}
                        {renderComponent(data, setHint, setCanvas, handleCheck, solutionTime, myLevel)}
                        <ExpBar currentExp={currentExp} maxExp={100} currentLevel={level} nextLevel={level+1} />
                        {currentExp===100&&
                            <>
                                <Confetti/>
                            </>
                        }
                        {feedback && <div className="text-lg font-semibold text-purple-700">{feedback}</div>}
                        {showSolution && <div className="text-green-800 font-bold">הדרך לפתרון {data.solutionMethod}</div>}

                    </div>

                    <div className={"exercise-left-container flex"}
                         onMouseEnter={()=> setLeftHovered(true)}
                         onMouseLeave={()=> setLeftHovered(false)}
                         style={{backgroundImage: "url("+`${leftHovered?island.child2Happy:island.child2}`+")"}}>

                        {leftHovered &&
                            <div className={"exercise-left-container-options flex"}>
                                {
                                    haveSolution &&
                                    <img className={"clickable exercise-page-prop-images"}
                                         onClick={() => setShowCanvas(!showCanvas)}
                                         src={Canvas} alt="NextQuestion"/>
                                }
                                {
                                    haveHint &&
                                    <img className={"clickable exercise-page-prop-images"} onClick={() => {
                                        setShowHint(!showHint);
                                        setUsedClue(!usedClue);}}
                                         src={TakeHint} alt="NextQuestion"/>

                                }

                            </div>
                        }
                    </div>
                </div>
            )}
        </div>
    );
}
