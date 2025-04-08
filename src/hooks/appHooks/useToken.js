import {useEffect, useState} from "react";
import Cookies from "js-cookie";

export function useToken() {
    const [token, setToken] = useState(null);
    useEffect(() => {
        setToken(Cookies.get("token"));
    }, []);
    return token;
}
