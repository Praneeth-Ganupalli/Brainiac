import { createContext, useReducer } from "react";
import axios from "axios";
import { QUIZ_BASE_URL } from "../utils/constants";
import { formattedChoices } from "../utils/helpers";
import Ques from "../assets/htmlQuestions.json";
const intialContext = {
  showForm: true,
  questionnare: [],
  currentQuestion: 1,
  showLoading: false,
  showQuestions: false,
  showResults: false,
  currentQuizResult: null,
};
export const QuizContext = createContext(intialContext);
const quizAppReducer = (state, action) => {
  switch (action.type) {
    case "SET_QUESTIONS": {
      const newQuestionnare = action.data;
      return {
        ...state,
        questionnare: newQuestionnare,
        showLoading: false,
        showQuestions: true,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        showLoading: true,
        showForm: false,
        showQuestions: false,
      };
    }
    case "SET_ANSWER": {
      const currentQuesAnswer = action.answer;
      const updatedQuestions = JSON.parse(JSON.stringify(state.questionnare));
      updatedQuestions[state.currentQuestion - 1].userAnswer =
        currentQuesAnswer;
      return { ...state, questionnare: updatedQuestions };
    }
    case "SET_NEXT_QUESTION": {
      const currentQues = state.currentQuestion + 1;
      return { ...state, currentQuestion: currentQues };
    }
    case "SUBMIT_QUIZ": {
      const answeredQues = JSON.parse(JSON.stringify(state.questionnare));
      const correctAnswers =
        (answeredQues.filter((ques) => ques.correctAnswer === ques.userAnswer)
          .length /
          answeredQues.length) *
        100;
      return {
        ...state,
        showResults: true,
        currentQuizResult: Math.floor(correctAnswers),
        showLoading: false,
        showQuestions: false,
      };
    }
    case "RESET_QUIZ": {
      return intialContext;
    }
    default:
      return intialContext;
  }
};
const QuizContextProvider = ({ children }) => {
  const [quizContext, dispatch] = useReducer(quizAppReducer, intialContext);
  const fetchQuestions = async (payload) => {
    dispatch({ type: "SET_LOADING" });
    const { amount, category, difficulty } = payload;
    try {
      const results = await axios.get(
        `${QUIZ_BASE_URL}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = results.data;
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }
      data.results = shuffleArray(Ques);
      if (data && data.results && data.results.length) {
        const formattedQuestionnare = data.results.map((dt) => {
          return {
            question: dt.question,
            correctAnswer: dt.correct_answer.replaceAll("<","&lt;").replaceAll(">","&gt;"),
            choices: formattedChoices(dt.correct_answer, dt.incorrect_answers),
          };
        });
        dispatch({ type: "SET_QUESTIONS", data: formattedQuestionnare });
      }
    } catch (er) {
      console.log("errorr in fetching questionnaere", er);
    }
  };
  const updateNextQuestion = (prevAnswer, updateNext = true) => {
    if (!prevAnswer) return;
    dispatch({ type: "SET_ANSWER", answer: prevAnswer });
    if (updateNext) {
      dispatch({ type: "SET_NEXT_QUESTION" });
    }
  };
  const submitQuizHandler = () => {
    dispatch({ type: "SET_LOADING" });
    setTimeout(() => {
      dispatch({ type: "SUBMIT_QUIZ" });
    }, 1500);
  };
  const resetQuiz = () => {
    dispatch({ type: "RESET_QUIZ" });
  };
  const quizContextValue = {
    ...quizContext,
    fetchQuestions,
    updateNextQuestion,
    submitQuizHandler,
    resetQuiz,
  };
  return (
    <QuizContext.Provider value={quizContextValue}>
      {children}
    </QuizContext.Provider>
  );
};
export default QuizContextProvider;
