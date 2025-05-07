// 📁 src/hooks/apiHooks/useUserLevels.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../utils/Constants.js";

export default function useUserLevels() {
    const [levels, setLevels]     = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);
    const token                   = Cookies.get("token");

    const reload = useCallback(async () => {
        if (!token) {
            setError("No auth token");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const { data } = await axios.get(
                `${SERVER_URL}/api/islands/get-level-by-user`,
                { params: { token } }
            );
            setLevels(data);
        } catch (e) {
            setError(e.message || "Failed to load levels");
            toast.error("שגיאה בטעינת השלבים: " + (e.message || ""));
        } finally {
            setLoading(false);
        }
    }, [token]);

    // initial load
    useEffect(() => {
        reload();
    }, [reload]);

    // SSE stream for live updates
    useEffect(() => {
        if (!token) return;
        const sse = new EventSource(
            `${SERVER_URL}/sse-notification/stream?token=${token}`
        );
        sse.addEventListener("message", (evt) => {
            const notice = JSON.parse(evt.data)[0];
            toast.info(`📢 ${notice.title}: ${notice.content}`, {
                position: "top-right",
                autoClose: 6000,
                theme: "light",
            });
        });
        return () => sse.close();
    }, [token]);

    return { levels, loading, error, reload };
}
