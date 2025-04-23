import React, {useState, useMemo, useEffect} from "react";

export const CompleteTheBoardExercise = ({ questions, onRestart }) => {
   const[answers, setAnswers] = useState([]);
   const[questionIndex, setQuestionIndex] = useState(0);
   const [question, setQuestion] = useState("");
   const [isWin,setIsWin] = useState(0);
useEffect(() => {
    let answerArray = [];
    questions.forEach((question) => {answerArray.push({answer:question.solution,isCorrect:false})});
    setAnswers(answerArray)
    setQuestionIndex(0)
    setIsWin(0)
    console.log(questions)
},[])

    useEffect(() => {
        let answerArray = [];
        questions.forEach((question,index) => {
            answerArray.push({id:index, answer: question.solution, isCorrect: false });
        });
        setAnswers(answerArray);
        setQuestionIndex(0);
        setIsWin(0);
        console.log(answerArray)
    }, [questions]);

   //TODO SHAFLE


    const checkAnswer =(answer)=>{
        console.log("a " ,answer)
        console.log("qa " ,questions[questionIndex])
        console.log("q " ,questionIndex-1)
        if (answer.answer === questions[questionIndex].solution) {
            answer.isCorrect = true;

            if (answers.length !== (questionIndex+1)) {
                setQuestionIndex(prevState => prevState + 1)
            }
            if (answers.length !== isWin) {
                setIsWin(prevState => prevState + 1)
            }
            setAnswers((prevState) =>
                prevState.map((a) =>
                    a === answer ? { ...a, isCorrect: true } : a
                )
            );

        }

        }
    useEffect(() => {
        let q = questions[questionIndex].num1 + questions[questionIndex].operator + questions[questionIndex].num2;
        setQuestion(q)
    }, [questionIndex])
    return (
        <div>
            {answers.length !== 0 && <div>
                {question.length !== 0 && <div>{question}</div>}
               {
                 answers.map((answer, index) => (
                     <button onClick={()=>checkAnswer(answer)} style={{background:answer.isCorrect?"green":"pink"}} key={index}>
                         {answer.answer}
                     </button>
                 ))
               }
           </div>}

            {

                (isWin)===(answers.length) && <div>
                    <h1>great job</h1>
                <button onClick={onRestart}>לוח חדש </button>
                </div>
            }
        </div>

   )
};
