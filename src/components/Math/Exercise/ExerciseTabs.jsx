import BasicMath from "../BasicMath/BasicMath.jsx";
import {useState} from "react";
import "./ExerciseTabs.css"
import LiteralProblem from "../literalProblem/LiteralProblem.jsx";

export default function ExerciseTabs() {
    const tabs = [
        {id:"multiplication", label:"לוח הכפל", component:null},
        {id:"equations", label:"משוואות", component:null},
        {id:"literalProblems", label:"בעיות מילוליות", component:<LiteralProblem/>},
        {id:"basicMath", label:"פעולות חשבון",component:<BasicMath/>},

    ]

    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const activeComponent = tabs.find(tab => tab.id === activeTab)?.component

    return (
        <div className={"exercise-tab-container flex"}>
            <div className={"exercise-type-chooser"}>
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        className={`exercise-type ${activeTab === tab.id ? "active glass" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
            TODO חיצים לשלב הבא וכפתור לבדיקת תשובה
            TODO לסדר את השיט הזה:
        {/*    @RequestMapping("/check-exercise")*/}
        {/*    public boolean checkExercise(String token, int id){*/}
        {/*    return false;*/}
        {/*}*/}
            <div className={"active-tab-component"}>{activeComponent}</div>
        </div>
    )
}