import BasicMath from "../BasicMath/BasicMath.jsx";
import {useState} from "react";
import "./ExerciseTabs.css"

export default function ExerciseTabs() {
    const tabs = [
        {id:"multiplication", label:"לוח הכפל", component:null},
        {id:"equations", label:"משוואות", component:null},
        {id:"literalProblems", label:"בעיות מילוליות", component:null},
        {id:"basicMath", label:"פעולות חשבון",component:<BasicMath/>},

    ]

    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const activeComponent = tabs.find(tab => tab.id === activeTab)?.component

    return (
        <div>
            <div className={"exercise-type-chooser"}>
                {tabs.map(tab => (
                    <span
                        key={tab.id}
                        className={`exercise-type ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </span>
                ))}
            </div>
            <div className={"exercise-container"}>
                {activeComponent}
            </div>
        </div>
    )
}