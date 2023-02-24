import { QuizContext } from '../context/QuizContext'
import { useContext } from 'react'
function useQuizContext() {
  const quizContext=useContext(QuizContext);
  return quizContext;
}

export default useQuizContext