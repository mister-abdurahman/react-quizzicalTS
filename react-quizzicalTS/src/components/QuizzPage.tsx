// https://opentdb.com/api.php?amount=5&category=9

import { EachQuestion } from "./EachQuestion";

export async function QuizPage() {
  return (
    <div className="quizz">
      {<EachQuestion />}
      <button className="start-btn">Check Answers</button>
    </div>
  );
}
