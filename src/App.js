import './App.css';
import QuizForm from './components/Quiz/QuizForm';
import useQuizContext from './hooks/use-quiz-context';
import Loader from './components/UI/Loader';
import QuizQuestion from './components/Quiz/QuizQuestion';
import QuizResult from './components/Quiz/QuizResult';
function App() {
  const ctx=useQuizContext();
  return (
    <main>
      {ctx.showForm && <QuizForm />}
      {ctx.showLoading && <Loader />}
      {ctx.showQuestions && <QuizQuestion />}
      {ctx.showResults && <QuizResult result={ctx.currentQuizResult} playAgainHandler={ctx.resetQuiz} />}
    </main>
  );
}

export default App;
