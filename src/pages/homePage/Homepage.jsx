import "./Homepage.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { SERVER_URL} from "../../utils/Constants.js";


export default function Homepage() {
    const location = useLocation();
    const { isAdmin } = location.state || {};
    const [levels,setLevels] = useState([]);
    useEffect(() => {
        getUserLevel()
    }, []);

    const getUserLevel = async () => {
        const token = Cookies.get("token");

        if (!token) {
            console.error("לא נמצא טוקן");
            return;
        }

        try {
            const { data } = await axios.get(`${SERVER_URL}/api/islands/get-level-by-user`, {
                params: { token }
            });
            console.log(data)
            setLevels(data);
        } catch (error) {
            console.error("שגיאה בקבלת שלב המשתמש:", error);
        }
    };


    return (
        <div className="homepage-container flex">
            {/*<div className="homepage-header header glass">*/}
            {/*    <h1>דף הבית</h1>*/}
            {/*</div>*/}
            {/*<div className="homepage-body flex glass">*/}
            {/*    <h1>שלבים</h1>*/}
            {/*    {*/}
            {/*        levels.length!==0&&<table>*/}
            {/*            <tbody>*/}
            {/*            <tr>*/}
            {/*                <td>האי</td>*/}
            {/*                <td>שלב</td>*/}
            {/*            </tr>*/}
            {/*            {*/}

            {/*                levels.map((level, index) => (*/}
            {/*                    <tr key={index} >*/}
            {/*                        <td> {level.island.name}</td>*/}
            {/*                        <td> {level.level}</td>*/}
            {/*                    </tr>*/}
            {/*                ))*/}


            {/*            }*/}
            {/*            </tbody>*/}
            {/*        </table>*/}
            {/*    }*/}
            {/*</div>*/}
        </div>
    );
}
