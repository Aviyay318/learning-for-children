// 📁 src/pages/IslandPage/IslandPage.jsx
import { useParams } from "react-router-dom";
import { ISLAND_CONFIGS_MAP } from "../../utils/IslandConfig.js";
import "./IslandPage.css";
import ExerciseTypesChooser from "../../components/NewMath/ExerciseTypes/ExerciseTypesChooser.jsx";

export default function IslandPage() {
    const { islandId } = useParams();
    const island = ISLAND_CONFIGS_MAP[islandId];
    if (!island) return <h2>Island not found 🚫</h2>;

    return (
        <div
            className="island-page-wrapper"
            style={{ backgroundImage: `url(${island.background})` }}
        >
            <div className="island-page-content">
                <h1>{island.name}</h1>
                <ExerciseTypesChooser />
            </div>
        </div>
    );
}
