import {useEffect, useState} from "react";
import "./ExerciseTabs.css"
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import {GET_QUESTION_TYPE} from "../../../utils/Constants.js";
import {SimpleExercise} from "../../NewMath/ExerciseTypes/SimpleExercise.jsx";
import {MultipleAnswerExercise} from "../../NewMath/ExerciseTypes/MultipleAnswerExercise.jsx";




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
        1: <SimpleExercise />,
        3: <MultipleAnswerExercise />,
        // 3: <CompleteTheBoard/>,
        // 4: <AmericanQuestion />,
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
                {activeComponent}
            </div>

        </div>
    )
}