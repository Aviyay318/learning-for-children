import {useEffect, useState} from "react";
import axios from "axios";
import {GET_USER_DATA, SERVER_URL} from "../../utils/Constants.js";
import Cookies from "js-cookie";

export default function PrivateDetails({userData}){
   
    return(
        <div>
        <h1>PrivateDetails</h1>
            {/*//TODO לעצב את השיט ram*/}
            {userData !== null && <div>
                <div>שם פרטי: {userData.firstName}</div>
                <div>שם משפחה: {userData.lastName}</div>
                <div>שם משתמש: {userData.username}</div>
                <div>אימייל: {userData.email}</div>
                <div>גיל: {userData.age}</div>
                <div>מגדר: {userData.gender}</div>
            </div>}
        </div>
    )
}