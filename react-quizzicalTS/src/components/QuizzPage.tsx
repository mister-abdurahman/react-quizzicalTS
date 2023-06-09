// https://opentdb.com/api.php?amount=5&category=9

import { ReactNode, useEffect, useState } from "react";
import { EachQuestion, EachQuestionProps } from "./EachQuestion";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export function QuizzPage() {
  const [quizz, setQuizz] = useState([]);

  useEffect(() => {
    async function fetchQuizz() {
      const data = await fetch(
        "https://opentdb.com/api.php?amount=5&category=9"
      );
      const dataJSON = await data.json();
      setQuizz(() => {
        return dataJSON.results.map((data: any) => {
          return {
            question: decode(data.question),
            options: shuffleArray([
              ...data.incorrect_answers,
              data.correct_answer,
            ]),
            answer: decode(data.correct_answer),
          };
        });
      });
    }
    fetchQuizz();
  }, []);

  function shuffleArray(array: string[] | boolean[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((el: string | boolean) => {
      if (typeof el == "string") return decode(el);
    });
    return array;
  }

  return (
    <div className="quizz-page">
      <div className="top-blob"></div>
      <div className="bottom-blob"></div>
      {quizz.map(
        (eachQuizz: EachQuestionProps): ReactNode => (
          <EachQuestion
            key={nanoid()}
            question={eachQuizz.question}
            options={eachQuizz.options}
            answer={eachQuizz.answer}
          />
        )
      )}

      <button className="submit-btn">Check Answers</button>
    </div>
  );
}
