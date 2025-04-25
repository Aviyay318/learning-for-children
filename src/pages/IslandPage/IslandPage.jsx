// 📁 src/pages/IslandPage/IslandPage.jsx
import { useParams } from "react-router-dom";
import { ISLAND_CONFIGS_MAP } from "../../utils/IslandConfig.js";
import "./IslandPage.css";
import ExerciseTypesChooser from "../../components/NewMath/ExerciseTypes/ExerciseTypesChooser.jsx";
import {useState} from "react";

export default function IslandPage() {
    const { islandId } = useParams();
    const island = ISLAND_CONFIGS_MAP[islandId];

    // React state to remember which exercise component to show
    const [selectedExercise, setSelectedExercise] = useState(null);

    if (!island) return <h2>Island not found 🚫</h2>;

    return (
        <div
            className="island-page-wrapper flex"
            style={{ backgroundImage: `url(${island.background})` }}
        >
            <>
                {!selectedExercise ? (
                    <div className="island-page-content flex">
                        <h1>ברוכים הבאים ל{island.name}</h1>
                        <ExerciseTypesChooser
                            islandId={islandId}
                            onChoose={(comp) => setSelectedExercise(() => comp)}
                            url={island.exerciseUrl}
                        />
                        {console.log("asdsadasdasadasda",island.exerciseUrl)}
                    </div>
                ) : (
                    <div className="island-page-content flex">
                        <button className="btn-back" onClick={() => setSelectedExercise(null)}>
                            ← חזרה לבחירת פעילות
                        </button>
                        <div className="exercise-component">
                            {selectedExercise}
                        </div>
                    </div>
                )}
            </>
        </div>
    );
}
