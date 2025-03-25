import useGetApi from "../useGetApi.js";
import Cookies from "js-cookie";

const useUserLevel = (suffix = "") => {
    const {data: userLevelData, error: userLevelError, loading: userLevelLoading, sendRequest: userLevelSendRequest} = useGetApi(`/get-level-${suffix}`)

    const getLevel = async () => {
        const token = Cookies.get("token")
        if (!token) {
            console.error("Token is missing!");
            return;
        }
        await userLevelSendRequest({token})
    }

    return { userLevel: userLevelData, userLevelError, userLevelData, getLevel}
}
export default useUserLevel;