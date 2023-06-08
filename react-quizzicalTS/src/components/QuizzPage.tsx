// https://opentdb.com/api.php?amount=5&category=9

import { ReactNode, useEffect, useState } from "react";
import { EachQuestion } from "./EachQuestion";

export function QuizzPage() {
  const [quizz, setQuizz] = useState([]);

  useEffect(() => {
    async function fetchQuizz() {
      const data = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9"
      );
      const dataJSON = await data.json();
      setQuizz(dataJSON);
    }
    fetchQuizz();
  }, []);

  console.log(quizz);
  type eachQuizz = string;
  return (
    <div className="quizz-page">
      <div className="top-blob"></div>
      <div className="bottom-blob"></div>
      {quizz.map(
        (eachQuizz): ReactNode => (
          <EachQuestion eachQuizz={eachQuizz.question} />
        )
      )}
      <button className="submit-btn">Check Answers</button>
    </div>
  );
}
