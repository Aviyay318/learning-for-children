
import { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../../utils/Constants";
import { useApiManager } from "../../contexts/ApiContext";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const useApi = (url, method = "GET", options = {}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const { wrapRequest } = useApiManager();
    const maxRetries = options.retries || 0;
    const minDelay = options.minDelay || 0;

    const sendRequest = async (payload = {}) => {
        setError(null);
        let attempts = 0;
        let lastError;

        await wrapRequest(async () => {
            while (attempts <= maxRetries) {
                try {
                    const response = await Promise.all([
                        method === "POST"
                            ? axios.post(SERVER_URL + url, payload)
                            : axios.get(SERVER_URL + url, { params: payload }),
                        delay(minDelay)
                    ]);

                    setData(response[0].data);
                    return;
                } catch (err) {
                    lastError = err;
                    if (err.response && err.response.status >= 400 && err.response.status < 500) {
                        break;
                    }
                    attempts++;
                    if (attempts <= maxRetries) {
                        await delay(2 ** attempts * 500);
                    }
                }
            }
        });

        if (lastError) {
            setError(lastError.response?.data?.message || "Request failed");
        }
    };

    return { data, error, sendRequest };
};

export default useApi;
