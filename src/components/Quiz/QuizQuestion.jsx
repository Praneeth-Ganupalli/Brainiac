import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import useQuizContext from "../../hooks/use-quiz-context";
import "./Quiz.css";
function QuizQuestion() {
  const qzCtx = useQuizContext();
  const questionnare = qzCtx.questionnare.at(qzCtx.currentQuestion - 1);
  const { question, choices,correctAnswer:questionAnswer } = questionnare;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isAnswered,setIsAnswered] = useState(false);
  const isLastQues=qzCtx.questionnare.length===qzCtx.currentQuestion;
  const answerBtnClickHandler = (val) => {
    if(isAnswered) return;
    setSelectedAnswer(val);
  };
  const nextQuestionHandler = () => {
    if (!selectedAnswer) return;
    if(isLastQues)
    {
        qzCtx.updateNextQuestion(selectedAnswer,false);
        qzCtx.submitQuizHandler();
        return;
    }
    qzCtx.updateNextQuestion(selectedAnswer);
  };
  const answerSubmitHandler=()=>{
    if(!selectedAnswer) return;
    setIsAnswered(true);
  }
  useEffect(()=>{
    setSelectedAnswer("");
    setIsAnswered(false);
  },[question])
  return (
    <section className="quiz-container">
      <Card>
        <section className="text-center quiz-question-container">
          <h1 className="mt-3" dangerouslySetInnerHTML={{__html:question}}/>
          <div className="answers-container mt-5">
            {choices &&
              choices.length > 0 &&
              choices.map((choice) => {
                let choiceClass="btn-info";
                if(isAnswered)
                {
                  if(questionAnswer === choice)
                  {
                    choiceClass='btn-success'
                  }
                  else if(selectedAnswer === choice)
                  {
                    choiceClass='btn-danger'
                  }
                }
                else if(selectedAnswer===choice)
                {
                  choiceClass='btn-secondary'
                }
                // if(isAnswered&&questionAnswer===choice)
                // {
                //   choiceClass='btn-success'
                // }
                // else if(isAnswered && !(questionAnswer===choice ))
                // {
                //   choiceClass='btn-danger'
                // }
                // if(!isAnswered && selectedAnswer===choice)
                // {
                //   choiceClass='btn-secondary'
                // }
                return (
                  <button
                    className={`btn btn-block w-25 answer-btn mb-2 ${
                     choiceClass
                    }`}
                    onClick={() => {
                      answerBtnClickHandler(choice);
                    }}
                    key={choice}
                    dangerouslySetInnerHTML={{__html: choice}}
                  />
                );
              })}
          </div>
          
          <section className="next-question mt-4 mb-2 d-flex">
            <div className="ms-auto d-flex btngroup"> 
            <button
              className="btn btn-block  btn-warning ms-auto quiz-questinnare-submit"
              onClick={answerSubmitHandler}
              disabled={isAnswered }
            >
             {<span>Answer</span> }
            </button>
          <button
              className="btn btn-block  btn-warning ms-auto quiz-questinnare-submit"
              onClick={nextQuestionHandler}
              disabled={!isAnswered}
            >
             {!isLastQues && <span>Next Question</span> }
             {isLastQues && <span>Submit Quiz</span>}
            </button>
            </div>
          
          </section>
        </section>
      </Card>
    </section>
  );
}

export default QuizQuestion;
