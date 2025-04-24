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
    SIMPLE_MATH_BACKGROUND, MULTIPLICATION_BACKGROUND, MULTIPLICATION_CHILDREN, SIMPLE_MATH_CHILDREN,
} from "./IslandConstants.js";

// 💡 Main config as an array
const ISLAND_CONFIGS = [
    {
        id: 1,
        key: "simpleMathIsland",
        name: "אי החיבור והחיסור",
        className: "simpleMathIsland",
        island: SIMPLE_MATH_ISLAND,
        background: SIMPLE_MATH_BACKGROUND,
        cardBackground: SIMPLE_MATH_ISLAND_BACKGROUND,
        children:SIMPLE_MATH_CHILDREN,
        url: "/island/simpleMathIsland",
        exerciseUrl:"/api/islands/Addition-and-subtraction",
        buttonColor: "green",

    },
    {
        id: 2,
        key: "multiplicationIsland",
        name: "אי הכפל",
        className: "multiplicationIsland",
        island: MULTIPLICATION_ISLAND,
        background: MULTIPLICATION_BACKGROUND,
        cardBackground: MULTIPLICATION_ISLAND_BACKGROUND,
        children: MULTIPLICATION_CHILDREN,
        url: "/island/multiplicationIsland",
        exerciseUrl:"/api/islands/multiplication",
        buttonColor: "yellow",
    },
    {
        id: 3,
        key: "divisionIsland",
        name: "אי החילוק",
        className: "divisionIsland",
        island: DIVISION_ISLAND,
        cardBackground: DIVISION_ISLAND_BACKGROUND,
        url: "/island/divisionIsland",
        exerciseUrl:"/api/islands/division",
        buttonColor: "blue",
    },
    {
        id: 4,
        key: "floatingPointIsland",
        name: "האי העשרוני",
        className: "floatingPointIsland",
        island: FLOATING_POINT_ISLAND,
        cardBackground: FLOATING_POINT_ISLAND_BACKGROUND,
        url: "/island/floatingPointIsland",
        exerciseUrl:"/api/islands/floating-point",
        buttonColor: "orange",
    },
    {
        id: 5,
        key: "longAddSubIsland",
        name: "אי החיבור והחיסור הארוך",
        className: "longAddSubIsland",
        island: LONG_ADDITION_SUBTRACTION_ISLAND,
        cardBackground: LONG_ADDITION_SUBTRACTION_ISLAND_BACKGROUND,
        url: "/island/longAddSubIsland",
        buttonColor: "pink",
    },
    {
        id: 6,
        key: "longMultDivIsland",
        name: "אי הכפל והחילוק הארוך",
        className: "longMultDivIsland",
        island: LONG_MULTIPLICATION_DIVISION_ISLAND,
        cardBackground: LONG_MULTIPLICATION_DIVISION_ISLAND_BACKGROUND,
        url: "/island/longMultDivIsland",
        buttonColor: "white",
    },
    {
        id: 7,
        key: "horrorIsland",
        name: "האי הסיוטי",
        className: "horrorIsland",
        island: HORROR_ISLAND,
        cardBackground: HORROR_ISLAND_BACKGROUND,
        url: "/island/horrorIsland",
        buttonColor: "deepBlue",
    },
    {
        id: 8,
        key: "equationsIsland",
        name: "אי המשוואות",
        className: "equationsIsland",
        island: EQUATIONS_ISLAND,
        cardBackground: EQUATIONS_ISLAND_BACKGROUND,
        url: "/island/equationsIsland",
        buttonColor: "purple",
    },
];

// ✅ Map by key
const ISLAND_CONFIGS_MAP = ISLAND_CONFIGS.reduce((map, island) => {
    map[island.key] = island;
    return map;
}, {});

// ✅ Map by id (server id)
const ISLAND_CONFIGS_BY_ID = ISLAND_CONFIGS.reduce((map, island) => {
    map[island.id] = island;
    return map;
}, {});

export { ISLAND_CONFIGS, ISLAND_CONFIGS_MAP, ISLAND_CONFIGS_BY_ID };
