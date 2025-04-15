import {RIGHT_ANSWER, WRONG_ANSWER} from "../../utils/Constants.js";

export const feedbackConfig = {

        optimal: { exp: 33.3333333, stars: 3, message:"מושלם", maxTime: 10, sound: RIGHT_ANSWER},
        regular: { exp: 20, stars: 2, message: "טוב מאוד", maxTime: 15 ,sound: RIGHT_ANSWER},
        delayed: { exp: 10, stars: 1, message: "מספיק", maxTime: 30 ,sound: RIGHT_ANSWER},
        usedAClue: { exp: 10, stars: 1, message: "טעון שיפור" ,sound: RIGHT_ANSWER},
        wrong: { exp: 0, stars: 0, message: "נסה שוב" ,sound: WRONG_ANSWER},
}