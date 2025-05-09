import React, {useState} from "react";
import ExpBar from "../../Feedback/ExpBar/ExpBar.jsx";
import Confetti from "react-confetti";
import time from "/src/assets/images/Islands/Props/ExercisePage/time.png";
import ExerciseGuide from "/src/assets/images/Islands/Props/Guide/game_guide.png";

export default function ExerciseUI({ island, loadNewQuestion, rightHovered, setRightHovered, leftHovered,setLeftHovered, solutionTime, renderComponent, data, handleCheck, myLevel, currentExp, feedback, showSolution, setShowGuide }) {

    return (
    <div className="simple island-math-box flex">
        <div className={"exercise-right-container flex"}
             onClick={loadNewQuestion}
             onMouseEnter={()=> setRightHovered(true)}
             onMouseLeave={()=> setRightHovered(false)}
             style={{backgroundImage: "url("+`${rightHovered?island.child1Happy:island.child1}`+")"}}>
            {rightHovered && <img className={"exercise-page-prop-images"} src={NextQuestion} alt="NextQuestion" />}
        </div>
      <div className={"exercise-middle-container"}>
        <img className={"clickable exercise-guide"} onClick={() => setShowGuide(true)} src={ExerciseGuide} alt={"guide"} />
        <div className="exercise-time flex">
          <img src={time} alt={"time"} />
          <label>{solutionTime} שניות</label>
        </div>
        {renderComponent(data, () => {}, () => {}, handleCheck, solutionTime, myLevel)}
        <ExpBar currentExp={currentExp} maxExp={100} currentLevel={myLevel} nextLevel={myLevel + 1} />
        {currentExp === 100 && <Confetti />}
        {feedback && <div className="text-lg font-semibold text-purple-700">{feedback}</div>}
        {showSolution && <div className="text-green-800 font-bold">הדרך לפתרון {data.solutionMethod}</div>}
      </div>

        <div className={"exercise-left-container flex"}
             onMouseEnter={()=> setLeftHovered(true)}
             onMouseLeave={()=> setLeftHovered(false)}
             style={{backgroundImage: "url("+`${leftHovered?island.child2Happy:island.child2}`+")"}}>

            {leftHovered &&
                <div className={"exercise-left-container-options flex"}>
                    {
                        haveSolution &&
                        <img className={"exercise-page-prop-images"}
                             onClick={() => setShowCanvas(!showCanvas)}
                             src={Canvas} alt="NextQuestion"/>
                    }
                    {
                        haveHint &&
                        <img className={"exercise-page-prop-images"} onClick={() => {
                            setShowHint(!showHint);
                            setUsedClue(!usedClue);}}
                             src={TakeHint} alt="NextQuestion"/>

                    }

                </div>
            }
        </div>
    </div>
  );
}
