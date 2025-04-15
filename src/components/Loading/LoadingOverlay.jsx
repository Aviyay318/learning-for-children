
import { useApiManager } from "../../contexts/ApiContext";
import "./LoadingOverlay.css";

export default function LoadingOverlay() {
    const { isLoading } = useApiManager();

    if (!isLoading) return null;

    return (
        <div className="loading-overlay flex">
            בטעינה
        </div>
    );
}
