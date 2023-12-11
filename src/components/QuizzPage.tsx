// https://opentdb.com/api.php?amount=5&category=9

import { ReactNode, useEffect, useRef, useState } from "react";
import { EachQuestion, EachQuestionProps } from "./EachQuestion";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import "../index.css";
import { Link } from "react-router-dom";

// type quizzPageProps = {
//   score: number
//   setScore: React.Dispatch<React.SetStateAction<number>>
//   setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
//   submitted: boolean
// }

const dummyQuizzData: EachQuestionProps[] = [
  {
    question: "What is my name?",
    options: ["Abdullah", "Zayd", "Abdurahman"],
    answer: "Abdurahman",
  },
  {
    question: "What is my name?",
    options: ["Abdullah", "Zayd", "Abdurahman"],
    answer: "Abdurahman",
  },
  {
    question: "What is my name?",
    options: ["Abdullah", "Zayd", "Abdurahman"],
    answer: "Abdurahman",
  },
  {
    question: "What is my name?",
    options: ["Abdullah", "Zayd", "Abdurahman"],
    answer: "Abdurahman",
  },
  {
    question: "What is my name?",
    options: ["Abdullah", "Zayd", "Abdurahman"],
    answer: "Abdurahman",
  },
];

export function QuizzPage() {
  const [quizz, setQuizz] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [restart, setRestart] = useState(false);
  const [score, setScore] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const markSelected = function (e: React.ChangeEvent<HTMLInputElement>) {
    quizz.forEach((el: EachQuestionProps) => {
      if (e.target.name === el.question) {
        el.selectedAns = e.target.value;
      }
    });
  };

  const submitQuizz = function () {
    console.log(quizz);
    quizz.forEach((eachQuizz: EachQuestionProps) => {
      if (eachQuizz.answer === eachQuizz.selectedAns) {
        setScore((prev) => {
          return prev + 1;
        });
      }

      if (eachQuizz.selectedAns !== eachQuizz.answer) {
        return document
          .getElementsByName(eachQuizz.question)
          .forEach((eachInput: any) => {
            if (eachInput.value === eachQuizz.answer) {
              eachInput.classList.add("correct-answer");
            }
            if (eachInput.value === eachQuizz.selectedAns) {
              console.log(eachQuizz.selectedAns);
              eachInput.classList.add("wrong-answer");
            }
          });
      }
      // return document.getElementsByName(`${eachQuizz.question}`).forEach((el: any)=>{
      //     if(eachQuizz.answer === el.value) el.classList.add('correct-answer')
      //   })
    });
    setSubmitted(true);
  };

  const playAgain = function () {
    setSubmitted(false);
    setScore(0);
    setRestart(true);
  };

  useEffect(() => {
    async function fetchQuizz() {
      setError("");
      setIsLoading(true);
      setQuizz([]);
      const data = await fetch(
        // "https://opentdb.com/api.php?amount=5&category=9"
        "https://opentdb.com/api.php?amount=5"
      );
      if (!data.ok) {
        setIsLoading(false);
        return setError("An error occured 😞");
      }
      // throw new Error("An error occured");
      const dataJSON = await data.json();
      setQuizz(
        dataJSON.results?.map((data: any) => {
          return {
            question: decode(data.question),
            options: shuffleArray([
              ...data.incorrect_answers,
              data.correct_answer,
            ]),
            answer: decode(data.correct_answer),
          };
        })
      );
      setIsLoading(false);
      setError("");
    }
    fetchQuizz();
  }, [restart]);

  console.log(quizz);

  const quizzArray = quizz?.map(
    (eachQuizz: EachQuestionProps, i: any): ReactNode => {
      return (
        <EachQuestion
          // key={nanoid()}
          key={i}
          question={eachQuizz.question}
          options={eachQuizz.options}
          answer={eachQuizz.answer}
          markSelected={markSelected}
          selectedAns={eachQuizz.selectedAns}
          // setTrackScore={setTrackScore}
        />
      );
    }
  );

  const shuffleArray = function (array: string[] | boolean[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((el: string | boolean) => {
      if (typeof el == "string") return decode(el);
    });
    return array;
  };

  // const markSelected = function (event: React.ChangeEvent<HTMLInputElement>) {
  //   const theSelectedOption: {selectedAns: string} = quizz.find(
  //     (el:EachQuestionProps) => el.question === event.target.name
  //     );
  //     // console.log(theSelectedOption)
  //     // console.log(event.target.value)
  //     theSelectedOption.selectedAns = event.target.value;
  //   }

  return (
    <div className="quizz-page">
      {(isLoading && <div className="loader"></div>) || (
        <div className="quizz-box">
          {(!quizzArray && error && (
            <span className="error-box"> {error} </span>
          )) ||
            quizzArray}
          {quizzArray && !submitted && (
            <button className="submit-btn" onClick={submitQuizz}>
              Check Answers
            </button>
          )}

          {submitted && (
            <div className="submitted">
              <h4>
                You scored {score} of {quizz.length} questions
              </h4>
              <button className="submit-btn play-again" onClick={playAgain}>
                <Link to={"/"} className="link-btn">
                  Play Again
                </Link>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
