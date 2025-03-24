import BasicMath from "../BasicMath/BasicMath.jsx";
import {useState} from "react";
import "./ExerciseTabs.css"
import LiteralProblem from "../literalProblem/LiteralProblem.jsx";
import Equations from "../Equations/Equations.jsx";
import MultiplicationProblems from "../MultiplicationProblems/MultiplicationProblems.jsx";

export default function ExerciseTabs() {
    const tabs = [
        {id:"multiplication", label:"לוח הכפל", component:<MultiplicationProblems/>},
        {id:"equations", label:"משוואות", component:<Equations/>},
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

            <div className={"active-tab-component"}>{activeComponent}</div>
        </div>
    )
}