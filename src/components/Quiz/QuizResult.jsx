import React from "react";
import Card from "../UI/Card";
function QuizResult({ result, playAgainHandler }) {
  let feedBackContent;
  if (result <= 30) {
    feedBackContent = (
      <h3>
        Hmm!..you can try again <p className="mt-2" style={{ fontSize: "48px" }}>&#128533;</p>
      </h3>
    );
  } else if (result > 30 && result < 70) {
    feedBackContent = (
      <h3>
        Great!..you did well. <p className="mt-2" style={{ fontSize: "48px" }}>&#128522;</p>
      </h3>
    );
  } else if (result > 70) {
    feedBackContent = (
      <h3>
        Congrats!...<p className="mt-2" style={{ fontSize: "48px" }}>&#128525;</p>
      </h3>
    );
  }
  return (
    <section className="quiz-result text-center">
      <Card>
        <section className="p-5">
         {feedBackContent}
          <p className="lead my-3">You have answered {result}% correctly</p>
          <button
            className="btn btn-block btn-lg btn-warning"
            onClick={playAgainHandler}
          >
            Play Again
          </button>
        </section>
      </Card>
    </section>
  );
}

export default QuizResult;
