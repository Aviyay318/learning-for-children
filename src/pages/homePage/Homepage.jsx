import {useLocation} from "react-router-dom";

export default function Homepage() {
    const location = useLocation();

    const { isAdmin } = location.state || {};
    return (
        <div>
            {isAdmin ? (
                <h3>Welcome, Admin!</h3>
            ) : (
                <h1>Welcome, User!</h1>
            )}
        </div>
    );
}