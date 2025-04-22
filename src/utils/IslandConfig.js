// 📁 src/utils/IslandConfigs.js
import {
    SIMPLE_MATH_ISLAND,
    SIMPLE_MATH_ISLAND_BACKGROUND,
    MULTIPLICATION_ISLAND,
    MULTIPLICATION_ISLAND_BACKGROUND,
    DIVISION_ISLAND,
    DIVISION_ISLAND_BACKGROUND,
    FLOATING_POINT_ISLAND,
    FLOATING_POINT_ISLAND_BACKGROUND,
    LONG_ADDITION_SUBTRACTION_ISLAND,
    LONG_ADDITION_SUBTRACTION_ISLAND_BACKGROUND,
    LONG_MULTIPLICATION_DIVISION_ISLAND,
    LONG_MULTIPLICATION_DIVISION_ISLAND_BACKGROUND,
    HORROR_ISLAND,
    HORROR_ISLAND_BACKGROUND,
    EQUATIONS_ISLAND,
    EQUATIONS_ISLAND_BACKGROUND,
} from "./IslandConstants";
// import useApi from "../hooks/apiHooks/useApi.js";

// const {islandNames} = useApi("/islands", "GET")
// Array of island configs for iteration
const ISLAND_CONFIGS = [
    { key: "simpleMathIsland", name: "אי החיבור והחיסור", className: "simpleMathIsland", island: SIMPLE_MATH_ISLAND, background: SIMPLE_MATH_ISLAND_BACKGROUND, url: "/island/simpleMathIsland", buttonColor: "green" },
    { key: "multiplicationIsland", name: "אי הכפל", className: "multiplicationIsland", island: MULTIPLICATION_ISLAND, background: MULTIPLICATION_ISLAND_BACKGROUND, url: "/multiplicationIsland", buttonColor: "yellow" },
    { key: "divisionIsland", name: "אי החילוק", className: "divisionIsland", island: DIVISION_ISLAND, background: DIVISION_ISLAND_BACKGROUND, url: "/island/divisionIsland", buttonColor: "blue" },
    { key: "floatingPointIsland", name: "האי העשרוני", className: "floatingPointIsland", island: FLOATING_POINT_ISLAND, background: FLOATING_POINT_ISLAND_BACKGROUND, url: "/floatingPointIsland", buttonColor: "orange" },
    { key: "longAddSubIsland", name: "אי החיבור והחיסור הארוך", className: "longAddSubIsland", island: LONG_ADDITION_SUBTRACTION_ISLAND, background: LONG_ADDITION_SUBTRACTION_ISLAND_BACKGROUND, url: "/longAddSubIsland", buttonColor: "pink" },
    { key: "longMultDivIsland", name: "אי הכפל והחילוק הארוך", className: "longMultDivIsland", island: LONG_MULTIPLICATION_DIVISION_ISLAND, background: LONG_MULTIPLICATION_DIVISION_ISLAND_BACKGROUND, url: "/longMultDivIsland", buttonColor: "white" },
    { key: "horrorIsland", name: "האי הסיוטי", className: "horrorIsland", island: HORROR_ISLAND, background: HORROR_ISLAND_BACKGROUND, url: "/horrorIsland", buttonColor: "deepBlue" },
    { key: "equationsIsland", name: "אי המשוואות", className: "equationsIsland", island: EQUATIONS_ISLAND, background: EQUATIONS_ISLAND_BACKGROUND, url: "/equationsIsland", buttonColor: "purple" },
];

// Map for direct lookup by key
const ISLAND_CONFIGS_MAP = ISLAND_CONFIGS.reduce((map, cfg) => {
    map[cfg.key] = cfg;
    return map;
}, {});

export { ISLAND_CONFIGS, ISLAND_CONFIGS_MAP };
export default ISLAND_CONFIGS;