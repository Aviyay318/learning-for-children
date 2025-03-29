import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {GET_MULTIPLE_EXERCISES} from "../../../utils/Constants.js";
import Cookies from "js-cookie";
import {useEffect, useState} from "react";
import "./CompleteTheBoard.css"
export default function CompleteTheBoard(){
    const { data: boardData, error: boardError, loading: boardLoading, sendRequest: sendBoardRequest } = useGetApi(GET_MULTIPLE_EXERCISES);
    const [currentExercise, setCurrentExercise] = useState(null)
    const [shownExerciseIds, setShownExerciseIds] = useState([])
    const [disabledButtons, setDisabledButtons] = useState([])
    const handleExercise = async () => {
        const token = Cookies.get("token");
        await sendBoardRequest({ token: token, level:1});
    };
    const woodSvgStyles = {
        width: 600,
        height: 600,
        textBaseX: 500,
        textBaseY: 300,
        lineGap: 150,
        textFontSize: "var(--font-size-huge)",
        textFontWeight: "var(--font-weight-bold)",
    }
    useEffect(() => {
        handleExercise()
    }, []);

    function getNewExercise() {
        if (!boardData || boardData.length === 0) {
            return
        } else {
            let availableExercises = boardData.filter(exercise => !shownExerciseIds.includes(exercise.id))
            if (availableExercises.length === 0) {
                availableExercises = boardData;
                setShownExerciseIds([])
            }
            const randomIndex = Math.floor(Math.random() * availableExercises.length);
            const newExercise = availableExercises[randomIndex];
            if (newExercise.id){
                setCurrentExercise(newExercise);
                setShownExerciseIds(prev => [...prev, newExercise.id])
            }

        }

    }
    useEffect(() => {
        if(boardData!==null && boardData.length>0 && !currentExercise){
            getNewExercise();
        }
    }, [boardData]);

    function handleAnswer(e) {
        if (!currentExercise){
            return
        }
        const answer = parseInt(e.currentTarget.value, 10)
        const buttonId = e.currentTarget.id;

        if (answer === currentExercise.solution && e.currentTarget.id!==null){
            const newDisabledButtons = [...disabledButtons];
            newDisabledButtons.push(buttonId);
            setDisabledButtons(newDisabledButtons)
            getNewExercise();
        }


    }

    function ExerciseComponent () {
        if(!currentExercise) return null;
        {console.log("showing the exercise component")}
        return(
            <div className={"exercise-component flex"}>
                {currentExercise.id}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={woodSvgStyles.width}
                    height={woodSvgStyles.height}
                    viewBox="0 0 1000 1000"
                    id={"wood-sign-arrow"}>
                    <g transform="rotate(270, 500, 500)">
                        <defs>
                            <clipPath id="clippath">
                                <path
                                    fill="#e69848"
                                    d="M286.3835,257.3426s19.829-14.7094,46.6303-15.2426c112.4775-2.2467,485.2748-8.8858,520.4182,15.2426,35.1433,24.1296,71.7154,410.7618,23.1456,451.0401-48.5722,40.2771-499.8501,18.4238-515.9223,18.4238-34.715,1.2828-54.9841-18.4238-54.9841-18.4238,0,0-197.6549-126.8597-205.3685-213.0022-9.0013-93.8572,186.0809-238.0379,186.0809-238.0379Z"
                                />
                            </clipPath>
                        </defs>

                        <path
                            fill="#aa5a24"
                            d="M286.3835,285.0713s19.829-14.707,46.6303-15.2438c112.4775-2.242,485.2748-8.8858,520.4182,15.2438,35.1433,24.1284,71.7154,410.7606,23.1456,451.0424-48.5722,40.2783-499.8501,18.4203-515.9223,18.4203-34.715,1.2864-54.9841-18.4203-54.9841-18.4203,0,0-197.6549-126.8632-205.3685-213.0021-9.0013-93.8561,186.0809-238.0404,186.0809-238.0404Z"
                        />
                        <g>
                            <path
                                fill="#e69848"
                                d="M286.3835,257.3426s19.829-14.7094,46.6303-15.2426c112.4775-2.2467,485.2748-8.8858,520.4182,15.2426,35.1433,24.1296,71.7154,410.7618,23.1456,451.0401-48.5722,40.2771-499.8501,18.4238-515.9223,18.4238-34.715,1.2828-54.9841-18.4238-54.9841-18.4238,0,0-197.6549-126.8597-205.3685-213.0022-9.0013-93.8572,186.0809-238.0379,186.0809-238.0379Z"
                            />
                            <g clipPath="url(#clippath)">
                                <path
                                    fill="#dd8e46"
                                    d="M143.2089,361.3192s147.9128-115.4035,308.8308-45.5122c160.9156,69.896,471.3729,55.2678,471.3729,55.2678v19.5007s-360.8444,16.2559-396.6045,107.2802c-35.7577,91.0243-426.8069,95.9016-426.8069,95.9016l-25.0594-79.8917s312.0814,11.6234,407.9807-66.3993c95.8991-78.0193,172.2942-55.2631,172.2942-55.2631,0,0-154.4142-22.3583-221.0571-46.9387-66.6428-24.5803-316.9563,73.8504-316.9563,73.8504l26.0056-57.7958Z"
                                />
                                <path
                                    fill="#dd8e46"
                                    d="M100.0013 440.966s264.2648-89.3978 332.5343-73.1467c68.267 16.2559 81.2699 31.0724 60.1392 51.2956-21.1307 20.2268-282.4886 86.7945-392.3721 76.2656-109.8836-10.5301-35.1128-17.0303-35.1128-17.0303 0 0 277.948-19.3183 357.5912-59.2353 79.6458-39.9134-112.155-10.2711-182.0463 12.292-69.8936 22.5642-154.4142 20.9365-154.4142 20.9365l13.6808-11.3774ZM237.484 278.4228s152.8089-27.6298 262.516 30.884c109.7046 58.5125 400.0011 35.9578 400.0011 35.9578l-9.0977-44.0858s-170.6701 56.8896-378.7221-16.2559c-208.0566-73.1419-260.0679-53.6401-260.0679-53.6401l-14.6294 47.1399Z"
                                />
                                <path
                                    fill="#dd8e46"
                                    d="M465.0425 223.1596s164.1687 121.9083 417.7352 56.8908l-3.2507-24.3839s-183.6752 43.8892-294.2015-32.5069c-110.5285-76.3963-120.283 0-120.283 0ZM521.9333 777.429s-.2848-1.2864-.7155-3.7133c-6.7863-38.1056-50.2411-356.838 395.6934-354.6007l4.875 29.9779s-409.6049-11.3775-287.7001 331.5869l-65.014-1.6277-47.1387-1.623Z"
                                />
                                <path
                                    fill="#dd8e46"
                                    d="M673.0969 780.6797s-149.5371-310.4573 263.3185-305.5801l-13.0027 27.6333s-221.0571 4.8736-219.4329 136.5365c1.6265 131.6592 24.3814 134.91 24.3814 134.91h34.1336s-65.0164-130.0363-6.5014-183.6764c58.5172-53.6354 159.2913-60.1403 159.2913-60.1403l9.7545 40.6384s-190.1743 45.697-117.0323 189.4517c0 0 22.7572-143.9431 108.9043-143.9431s-68.267 164.1699-68.267 164.1699c0 0-149.5416 35.7612-175.5472 0ZM151.3369 644.1431s263.3185-30.8839 341.3378-78.0192c78.0216-47.1351 47.1387 26.0068-27.6322 55.2631-74.7708 29.2563-292.5748 50.3895-292.5748 50.3895l-21.1307-27.6334ZM260.6131 704.8084s131.2874-24.904 188.1759-59.0388c56.8884-34.1335 63.3922 4.8738 16.2535 35.7578-47.1363 30.8839-169.0435 62.5836-169.0435 62.5836l-35.3859-39.3026Z"
                                />
                                <path
                                    fill="#ce8041"
                                    d="M526.8082 497.8557s34.9715-42.4215 163.9875-78.9784c0 0-149.424 21.1295-163.9875 78.9784ZM222.1674 671.1209s120.8432-19.0758 168.4527-30.0802c0 0-150.5727 27.3709-172.7863 21.9523l4.3336 8.1279ZM493.3314 635.2526s19.2594 23.4046-32.2152 55.3737c-51.4722 31.9668-103.4905 42.0978-103.4905 42.0978l-7.1015-6.1388s150.0948-38.3364 142.8072-91.3327ZM254.1353 544.872s178.5462-9.7544 245.8647-71.5225c0 0 27.2202-34.6797 56.4789-41.1798 0 0-29.1551 10.8373-56.4789 46.9586-27.3214 36.1226-150.1395 62.1329-245.8647 65.7438ZM454.6149 351.9825s-69.7265-8.993-105.3005-4.2263c0 0 60.8688-18.5297 105.3005 4.2263ZM611.5619 656.3903s8.6245-143.4969 184.4755-192.1691c0 0-175.6297 23.3751-184.4755 192.1691ZM472.6785 234.2182s88.2773 61.6973 221.1372 63.3581c0 0-113.4945-4.1158-206.6915-68.4119l-14.4457 5.0538ZM832.8379 616.8452s-44.453 50.1564-28.5572 115.8789h-7.6007s-30.9864-64.854 36.1579-115.8789Z"
                                />
                            </g>
                        </g>
                    </g>
                    <g
                        fill="#fff"
                        textAnchor="middle"
                        fontSize={woodSvgStyles.textFontSize}
                        fontWeight={woodSvgStyles.textFontWeight}
                        dominantBaseline="middle"
                    >
                        <text x={woodSvgStyles.textBaseX} y={woodSvgStyles.textBaseY}>
                            {currentExercise.num1}
                        </text>
                        <text x={woodSvgStyles.textBaseX} y={woodSvgStyles.textBaseY+woodSvgStyles.lineGap}>
                            {currentExercise.operand1}{currentExercise.num2}
                        </text>
                        <text x={woodSvgStyles.textBaseX} y={woodSvgStyles.textBaseY+woodSvgStyles.lineGap*2}>
                            {currentExercise.operandEqual}
                        </text>
                        <text x={woodSvgStyles.textBaseX} y={woodSvgStyles.textBaseY+woodSvgStyles.lineGap*3}>
                            ?
                        </text>
                    </g>
                </svg>


            </div>
        )
    }
    function AnswerBoardComponent() {
        if (!boardData || boardData.length === 0) {
            return <div>Loading...</div>;
        }
        {console.log("showing the board component")}
        return(
            <div className={"complete-board"}>
                {boardData !== null ? boardData.map((exercise, index) => (
                    <div className={"board-grid"} key={index} style={{textAlign: 'center'}}>
                        {exercise!=null && exercise.id}
                        <button
                            className={"grid-button flex"}
                            id={`board-button-${index}`}
                            onClick={(e) => handleAnswer(e)}
                            value={exercise.solution}
                            disabled={disabledButtons.includes(`board-button-${index}`)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100" height="100"
                                viewBox="0 0 80 80">

                                <defs>
                                    <linearGradient id="bgPink" x1="0" y1="0" x2="1" y2="1">
                                        <stop offset="0%" stopColor="#F17164"/>
                                        <stop offset="100%" stopColor="#F7939B"/>
                                    </linearGradient>
                                </defs>

                                <rect

                                    width="80" height="80"
                                    rx="15" ry="15"
                                    fill="url(#bgPink)"/>

                                <polygon
                                    fill="rgba(255,255,255,0.2)"
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth="6"
                                    strokeLinejoin="round"
                                    strokeLinecap="round"
                                    points="40,12 47.1,30.3 66.6,31.4 51.4,43.7 56.5,62.7 40,52 23.5,62.7 28.6,43.7 13.4,31.4 32.9,30.3"
                                />

                                <text
                                    x="39"
                                    y="42"
                                    textAnchor="middle"
                                    dominantBaseline={"middle"}
                                    fill="#FFFFFF"
                                >
                                    {exercise.solution}
                                </text>
                            </svg>
                        </button>
                    </div>
                )) : <div>shit</div>
                }
            </div>
        )
    }

    return (
        <div className={"complete-the-board-container  flex"}>
            <ExerciseComponent/>
            <AnswerBoardComponent/>
        </div>

    )
}