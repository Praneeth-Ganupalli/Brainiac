export function formattedChoices(correctAnswer,incorrectAnswers)
{
    const formattedChoices=[...incorrectAnswers];
    const correctAnswerIdx=Math.round(Math.random()*3);
    formattedChoices.splice(correctAnswerIdx,0,correctAnswer);
    return formattedChoices;
}