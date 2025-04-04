import {useState} from "react";
import axios from "axios";
import {SERVER_URL} from "../../utils/Constants.js";

const usePostApi = (url) =>{
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    const sendRequest = async (body = {}) => {
        setLoading(true);
        setError(null);

        try {
            // console.log("body: ",body);
            const response = await axios.post(SERVER_URL + url, body);
            // console.log("url + body ",SERVER_URL + url, body);
            // console.log("response: ",response.data);
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Request failed');
        } finally {
            setLoading(false);
        }
    };

    return {data, error, loading, sendRequest };

}
export default usePostApi;