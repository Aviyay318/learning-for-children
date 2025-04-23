import {useEffect, useState} from "react";
import axios from "axios";
// import {GET_ISLAND_LIST, GET_USER_HISTORY, SERVER_URL} from "../../utils/Constants.js";
import Cookies from "js-cookie";
import {GET_USER_HISTORY, SERVER_URL} from "../../utils/Constants.js";


export default function UserHistory() {
    const [historyList,setHistoryList] = useState([]);
    // const [filteredList, setFilteredList] = useState(historyList);
    // const [islandList, setIslandList] = useState([]);
    // const [showAllFilter, setShowAllFilter] = useState(true);
    // const [onlyCorrectFilter, setOnlyCorrectFilter] = useState(true);
    // const [onlyIncorrectFilter, setOnlyIncorrectFilter] = useState(true);
    // const [chosenIslandFilter, setChosenIslandFilter] = useState(true);

//TODO לא לשכוח להוסיף SELECT של האיים
    //TODO לכל איבר ברשימת איים יש .ID ו- .NAME שקיבלתי מהשרת
    //TODO להתאים שם בין האי שבהיסטורי כי הוא מגיע עם ID

    useEffect(() => {
        const token = Cookies.get('token') ;
        getUserHistory(token);
        // getIslandList;
    }, []);

    // useEffect(()=>{
    //     filterList;
    // },[showAllFilter,onlyCorrectFilter,onlyIncorrectFilter]);

    // const getIslandList = async ()=>{
    //     const response = await axios.get(SERVER_URL+GET_ISLAND_LIST);
    //     if (response.status === 200) {
    //         if (response.data.length > 0) {
    //             setIslandList(response.data);
    //         }
    //     }
    // }

    const getUserHistory = async (token) => {
        const response = await axios.get(SERVER_URL + GET_USER_HISTORY + "?token=" + token);
        if (response.status === 200) {
            if (response.data.length > 0 ) {
                setHistoryList(response.data)
            }
        }

    }

    // const filterList = ()=>{
    //     let filteredList = historyList;
    //     filteredList= filterIsland(filteredList);
    //     if (!showAllFilter) {
    //         if (onlyCorrectFilter) {
    //             filteredList = filterCorrect(filteredList);
    //         }else if (onlyIncorrectFilter) {
    //             filteredList = filterIncorrect(filteredList);
    //         }
    //     }
    //     setFilteredList(filteredList);
    // }

    // const filterCorrect = (listToFiler)=>{
    //     return listToFiler.filter((history)=>{history.is_correct_answer === true});
    // }
    //
    // const filterIncorrect = (listToFiler)=>{
    //     return listToFiler.filter((history)=>{history.is_correct_answer === false});
    // }
    //
    // const filterIsland = (listToFiler)=>{
    //     return listToFiler.filter((history)=>{history.island === chosenIslandFilter});
    // }

//TODO @RequestMapping("/get-question-type")
    //TODO לאתר את השם הנכון של סוג השאלה לפי הID
    return(
        <div>



            <table>
                <tr>
                    <th>🧮🔢 תרגיל</th>
                    <th>❌/✔ תוצאה</th>
                    <th>🎯 רמה</th>
                    <th>📘🔍 סוג שאלה</th>
                    <th>📝 תשובה סופית</th>
                    <th>⏱ זמן פתרון</th>
                    <th>🌴 אי</th>
                </tr>

                {
                    // filteredList.map((history, index) => {
                        historyList.map((history, index) => {
                        return (
                            <tr key={index}>
                                <td>{history.exercise}</td>
                                <td>{history.correctAnswer?"✔":"❌"}</td>
                                <td>{history.level}</td>
                                <td>{history.questionType.name}</td>
                                <td>{history.answer}</td>
                                <td>{history.solutionTime}</td>
                                <td>{history.islands.name}</td>
                            </tr>
                        );

                    })
                }
            </table>
        </div>
    );
}
//TODO כאן קוראים לפונקציה ששולחים את מה שפה והיא מחזירה את השם שורה 102
//TODO כאן קוראים לפונקציה ששולחים את מה שפה והיא מחזירה את השם שורה 105


