import "./Statistics.css"
import {useLocation} from "react-router-dom";

export default function Statistics() {
    const location = useLocation();

    const { isAdmin } = location.state || {};
    return (
        <div className={"statistics-container flex"}>
            <div className={"statistics-header header glass"}>
                <h1>סטטיסטיקה</h1>
            </div>
            <div className={"statistics-body flex glass"}>
                <h1>Statistics</h1>
            </div>

        </div>
    );
}