import React, { useCallback, useState } from "react";
import Card from "../UI/Card";
import DropDown from "../UI/DropDown";
import { CATEGORY_OPTIONS } from "../../utils/constants";
import { DIFFICULTY_OPTIONS } from "../../utils/constants";
import useQuizContext from "../../hooks/use-quiz-context";
function QuizForm() {
  const [questionsCount,setQuestionsCount]=useState(5);
  const [difficulty,setDifficulty]=useState(DIFFICULTY_OPTIONS[0].value);
  const [category,setCategory]=useState(CATEGORY_OPTIONS[0].value);
  const quizContext=useQuizContext();
  const qCountChangeHandler=(e)=>{
    const inputVal=e.target.value<=50?e.target.value:50;
    setQuestionsCount(inputVal);
  }
  const categoryChangeHandler=useCallback((val)=>{
    setCategory(val);
  },[])
  const difficultyChangeHandler=useCallback((val)=>{
    setDifficulty(val);
  },[])
  const quizFormSubmitHandler=(e)=>{
    e.preventDefault();
    const payload={
      amount:questionsCount,
      difficulty,
      category
    }
    quizContext.fetchQuestions(payload);
  }
  return (
    <section className="quiz-section">
        <Card>
            <h2 className="m-0 p-0">Setup Quiz</h2>
            <section className="quiz-form mt-3">
              <form onSubmit={quizFormSubmitHandler}>
                <div className="form-group mb-2">
                  <label>Number of Questions</label>
                  <input type="number" className="form-control mt-2" value={questionsCount} onChange={qCountChangeHandler} min={1} max={50} />
                </div>
                <div className="form-group mb-3">
                  <label>Category</label>
                  <DropDown options={CATEGORY_OPTIONS} onSelect={categoryChangeHandler} />
                </div>
                <div className="form-group mb-3">
                  <label>Select Difficulty</label>
                  <DropDown options={DIFFICULTY_OPTIONS} onSelect={difficultyChangeHandler} />
                </div>
                <section className="start-section d-flex mt-3">
                  <button className="btn btn-block w-100  btn-lg btn-info text-white fw-bold">Start Quiz</button>
                </section>
              </form>
            </section>
        </Card>
    </section>
    
  );
}

export default QuizForm;
