import useApi from "../../hooks/apiHooks/useApi.js";
import { GET_GUIDE } from "../../utils/Constants.js";
import { useEffect } from "react";

export default function Guide({url, payload}) {
    const { data, sendRequest } = useApi(url, "GET", { minDelay: 0 });

    useEffect(() => {
        if (payload){
            sendRequest(payload); // שליחת אובייקט תקין
        } else{
            sendRequest()
        }

    }, []);

    return (
        <div style={{ direction: "rtl", padding: "1rem", borderRadius: "12px" }}>
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
