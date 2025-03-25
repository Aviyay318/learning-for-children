import BasicMath from "../BasicMath/BasicMath.jsx";
import {useEffect, useState} from "react";
import "./ExerciseTabs.css"
import LiteralProblem from "../literalProblem/LiteralProblem.jsx";
import Equations from "../Equations/Equations.jsx";
import MultiplicationProblems from "../MultiplicationProblems/MultiplicationProblems.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {GET_MATH, GET_QUESTION_TYPE, SERVER_URL} from "../../../utils/Constants.js";




export default function ExerciseTabs({level}) {

    const { data: questionTypeData, error: questionTypeError, loading: questionTypeLoading, sendRequest: sendQuestionTypeRequest } = useGetApi(GET_QUESTION_TYPE);
    const [tabs, setTabs] = useState([])

    const handleQuestionType = async () => {
        await sendQuestionTypeRequest({});
    }

    useEffect(() => {
        handleQuestionType()
    }, []);

    const [activeTab, setActiveTab] = useState()
    const activeComponent = tabs.find(tab => tab.id === activeTab)?.component

    const componentsMap = {
        1: <BasicMath />,
        2: <LiteralProblem />,
        3: <Equations />,
        4: <MultiplicationProblems />,
    };

    useEffect(() => {
        if (questionTypeData) {
            const mappedTabs = questionTypeData.map (type => ({
                id: type.id,
                label: type.name,
                component: componentsMap[type.id] || <div>Component not defined</div>,
            })).reverse();
            setTabs(mappedTabs)
        }
    }, [questionTypeData]);



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

            <div className={"active-tab-component"}>
                <h1>User Level: {level !== null ? level : "Loading..."}</h1>
                {activeComponent}
            </div>

        </div>
    )
}