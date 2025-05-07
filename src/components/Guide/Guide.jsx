import useApi from "../../hooks/apiHooks/useApi.js";
import { GET_GUIDE } from "../../utils/Constants.js";
import { useEffect } from "react";

export default function Guide() {
    const { data, sendRequest } = useApi(GET_GUIDE, "GET", { minDelay: 0 });

    useEffect(() => {
        sendRequest();
    }, []);

    return (
        <div style={{ direction: "rtl", padding: "1rem", background: "#fff8dc", borderRadius: "12px" }}>
            {data ? (
                <div
                    dangerouslySetInnerHTML={{ __html: data }}
                    style={{ fontSize: "1.1rem", }}
                />
            ) : (
                <p>טוען הוראות...</p>
            )}

        </div>
    );
}
