import React, { useEffect, useRef, useState } from "react";
import { SimpleExercise } from "../ExerciseTypes/SimpleExercise.jsx";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import axios from "axios";
import { SERVER_URL } from "../../../utils/Constants.js";
import "../AddAndSubInsland/AddAndSubIsland.css"
import SimpleMath from "../AddAndSubInsland/SimpleMath.jsx";

export default function AddAndSubSimpleMath ({ questionType }) {
    return(
        <>
            <SimpleMath questionType={questionType} url={"/api/islands/Addition-and-subtraction"}/>
        </>
    )
}
