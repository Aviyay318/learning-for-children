import "./Statistics.css"
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_STATISTICS_DATA, SERVER_URL} from "../../utils/Constants.js";
import Cookies from "js-cookie";

export default function Statistics() {
    const location = useLocation();
    const [statistics, setStatistics] = useState(null);

    const getStatisticsData = async () => {
        const token = Cookies.get("token");
        const response = await axios.get(SERVER_URL + GET_STATISTICS_DATA +"?token=" + token);
        setStatistics(response.data);
        console.log(response.data);
    }
    useEffect(() => {
        getStatisticsData()
    }, []);





    const { isAdmin } = location.state || {};
    return (
        <div className={"statistics-container flex"}>
            <div className={"statistics-header header glass"}>
                <h1>סטטיסטיקה</h1>
            </div>
            <div className={"statistics-body flex glass"}>
                {
                  statistics!==null&&<div>
                    <div> סה"כ שאלות : {statistics.howMuchQuestion}</div>
                    <div>שאלות נכונות שענית : {statistics.correctAnswer}</div>
                    <div>שאלות לא נכונות שענית : {statistics.inCorrectAnswer}</div>
                    </div>
                }
            </div>

        </div>
    );
}