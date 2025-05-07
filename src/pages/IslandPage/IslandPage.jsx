// 📁 src/pages/IslandPage/IslandPage.jsx
import { useParams } from "react-router-dom";
import { ISLAND_CONFIGS_MAP } from "../../utils/IslandConfig.js";
import "./IslandPage.css";
import ExerciseTypesChooser from "../../components/NewMath/ExerciseTypes/ExerciseTypesChooser.jsx";
import React, { useState } from "react";
import IslandGuide from "../../assets/images/Islands/Props/Guide/island_guide.png";
import Modal from "../../components/Modal/Modal.jsx";
import Guide from "../../components/Guide/Guide.jsx";
import {GET_GUIDE_FOR_ISLAND} from "../../utils/Constants.js";

export default function IslandPage() {
    const { islandId } = useParams();
    const island = ISLAND_CONFIGS_MAP[islandId];
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [showGuide, setShowGuide] = useState(false);

    if (!island) return <h2>Island not found 🚫</h2>;

    return (
        <div
            className="island-page-wrapper flex"
            style={{ backgroundImage: `url(${island.background})` }}
        >
            {/* 1) Render the Modal here, so React can actually mount/unmount it */}
            <Modal
                title="הוראות"
                component={<Guide url={GET_GUIDE_FOR_ISLAND} payload={{islandId: island.id}}/>}
                showModal={showGuide}
                setShowModal={setShowGuide}
            />

            {!selectedExercise ? (
                <div className="island-page-content flex">
                    <h1>ברוכים הבאים ל{island.name}</h1>

                    {/* 2) Toggle the boolean on click, don't return JSX from click */}
                    <div
                        className="island-guide flex"
                        onClick={() => setShowGuide(true)}
                    >
                        <img
                            className="island-guide-img"
                            src={IslandGuide}
                            alt="guide"
                        />
                        <label className="island-guide-label">הוראות</label>
                    </div>

                    <ExerciseTypesChooser
                        islandId={islandId}
                        island={island}
                        onChoose={(comp) => setSelectedExercise(() => comp)}
                        url={island.exerciseUrl}
                    />
                </div>
            ) : (
                <div className="island-page-content flex">
                    <button
                        className="btn-back"
                        onClick={() => setSelectedExercise(null)}
                    >
                        ← חזרה לבחירת פעילות
                    </button>
                    <div className="exercise-component">{selectedExercise}</div>
                </div>
            )}
        </div>
    );
}
