import "./Statistics.css"
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {GET_STATISTICS_DATA, SERVER_URL} from "../../utils/Constants.js";
import Cookies from "js-cookie";

export default function Statistics() {
    const location = useLocation();
    const [statistics, setStatistics] = useState(null);
    const [numberOfSuccess, setNumberOfSuccess] = useState(40);
    const [numberOfWrongs, setNumberOfWrongs] = useState(10);



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
                <div>
                    <img
                        src={`https://quickchart.io/chart?width=300&height=300&c={type:'pie',data:{labels:['נכונים','שגויים','שיט נוסף'],datasets:[{data:[${numberOfSuccess},${numberOfWrongs},20]}]}}`}
                        alt="Pie Chart"
                        style={{width: '300px', height: '300px'}}
                    />

                </div>
                {
                    statistics !== null && <div>
                        <div> סה"כ שאלות : {statistics.howMuchQuestion}</div>
                        <div>שאלות נכונות שענית : {statistics.correctAnswer}</div>
                        <div>שאלות לא נכונות שענית : {statistics.inCorrectAnswer}</div>
                    </div>
                }
            </div>

        </div>
    );
}