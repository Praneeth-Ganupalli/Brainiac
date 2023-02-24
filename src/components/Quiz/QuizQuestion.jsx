import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import useQuizContext from "../../hooks/use-quiz-context";
import "./Quiz.css";
function QuizQuestion() {
  const qzCtx = useQuizContext();
  const questionnare = qzCtx.questionnare.at(qzCtx.currentQuestion - 1);
  const { question, choices } = questionnare;
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const isLastQues=qzCtx.questionnare.length===qzCtx.currentQuestion;
  const answerBtnClickHandler = (val) => {
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
  useEffect(()=>{
    setSelectedAnswer("");
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
                return (
                  <button
                    className={`btn btn-block w-25 answer-btn mb-2 ${
                      selectedAnswer === choice ? "btn-secondary" : "btn-info"
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
          <button
              className="btn btn-block w-25 btn-warning ms-auto"
              onClick={nextQuestionHandler}
            >
             {!isLastQues && <span>Next Question</span> }
             {isLastQues && <span>Submit Quiz</span>}
            </button>
          </section>
        </section>
      </Card>
    </section>
  );
}

export default QuizQuestion;
