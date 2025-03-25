import "./Homepage.css"
import {useLocation} from "react-router-dom";

export default function Homepage() {
    const location = useLocation();

    const { isAdmin } = location.state || {};
    return (
        <div className={"homepage-container flex"}>
            <div className={"homepage-header header glass"}>
                <h1>דף הבית</h1>
            </div>
            <div className={"homepage-body flex glass"}>
                {isAdmin ? (
                    <h3>Welcome, Admin!</h3>
                ) : (
                    <h1>Welcome, User!</h1>
                )}
            </div>

        </div>
    );
}