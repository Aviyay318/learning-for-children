import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../utils/Constants.js";
const useGetApi = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const sendRequest = async ({token,level}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(SERVER_URL + url, {
                params: {token:token, level: level }  // העברת ה-level כפרמטר
            });
            console.log(response);
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, sendRequest };
};

export default useGetApi;