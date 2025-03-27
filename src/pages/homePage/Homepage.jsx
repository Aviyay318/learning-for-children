import "./Homepage.css"
import {useLocation} from "react-router-dom";
import MultiplicationTable from "../../components/Math/MultiplicationProblems/MultiplicationProblems.jsx";
import AmericanQuestion from "../../components/Math/AmericanQuestion/AmericanQuestion.jsx";
import CompleteTheBoard from "../../components/Math/CompleteTheBoard/CompleteTheBoard.jsx";

export default function Homepage() {
    const location = useLocation();

    const { isAdmin } = location.state || {};
    return (
        <div className={"homepage-container flex"}>
            <div className={"homepage-header header glass"}>
                <h1>דף הבית</h1>
            </div>
            <div className={"homepage-body flex glass"}>
                {/*{isAdmin ? (*/}
                {/*    <label>Welcome, Admin!</label>*/}
                {/*) : (*/}
                {/*    <label>Welcome, User!</label>*/}
                {/*)}*/}
                <CompleteTheBoard/>
                {/*<div>*/}
                {/*    <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>*/}
                {/*        <rect x='5' y='20' width='40' height='10' fill='orange'/>*/}
                {/*        <polygon points='5,20 0,25 5,30' fill='pink'/>*/}
                {/*    </svg>*/}
                {/*    <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50'>*/}
                {/*        <ellipse cx='25' cy='30' rx='20' ry='10' fill='red'/>*/}
                {/*        <circle cx='25' cy='20' r='10' fill='darkred'/>*/}
                {/*    </svg>*/}
                {/*    <AmericanQuestion/>*/}
                {/*</div>*/}
            </div>
        </div>

    );
}