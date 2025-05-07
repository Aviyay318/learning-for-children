import useApi from "../../hooks/apiHooks/useApi.js";
import {GET_GUIDE} from "../../utils/Constants.js";
import {useEffect} from "react";

export default function Guide(){

    const { data, sendRequest } = useApi(GET_GUIDE, "GET", { minDelay: 0 });

    const getGuide = async () => {
        await sendRequest();
    };

    useEffect(() => {
        getGuide()
        console.log(data)

    }, []);


    return (
        <label>
            {data && data}
        </label>
    )
}