import "./Homepage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL, GET_LEVEL } from "../../utils/Constants.js";
import MultiplicationTable from "../../components/Math/MultiplicationProblems/MultiplicationProblems.jsx";
import AmericanQuestion from "../../components/Math/AmericanQuestion/AmericanQuestion.jsx";
import CompleteTheBoard from "../../components/Math/CompleteTheBoard/CompleteTheBoard.jsx";
import Tutorial from "../../components/Tutorial/Tutorial.jsx";
import {useTutorial} from "../../hooks/uiHooks/useTutorial.js";

export default function Homepage() {
    const location = useLocation();
    const { isAdmin } = location.state || {};

    const [userLevel, setUserLevel] = useState(null);
    useEffect(() => {
        getUserLevel();
    }, []);

    const getUserLevel = async () => {
        const token = Cookies.get("token");
        try {
            const response = await axios.get(`${SERVER_URL}${GET_LEVEL}?token=${token}`);
            setUserLevel(response.data);
        } catch (error) {
            console.error("שגיאה בקבלת שלב המשתמש:", error);
        }
    };

    return (
        <div className="homepage-container flex">
            <div className="homepage-header header glass">
                <h1>דף הבית</h1>
            </div>

            <div className="homepage-body flex glass">
                {/*<div className="level-box">*/}
                {/*    <Tutorial topic={"equationThreeVars"}/>*/}
                {/*    {userLevel !== null ? (*/}
                {/*        <h3>הרמה שלך: {userLevel}</h3>*/}
                {/*    ) : (*/}
                {/*        <h3>טוען רמה...</h3>*/}
                {/*    )}*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
