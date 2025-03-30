import {useEffect, useState} from "react"
import {GET_MATH, SERVER_URL} from "../../../utils/Constants.js";
import useGetApi from "../../../hooks/apiHooks/useGetApi.js";
import Cookies from "js-cookie";
import "./Exercise.css"

export default function Exercise(data, NumericInput){

    const buildExercise = () => {
      return(
          <>
              <label>{data.num1}</label>
              <label>{data.operand}</label>
              <label>{data.num2}</label>
              <label>{data.operandEqual}</label>
              <NumericInput/>
          </>
      )
    };


    return (
        <div>
            {data!==null&&buildExercise()}
        </div>
    )
} ;