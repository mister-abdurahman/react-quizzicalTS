import React, { useEffect, useState } from "react";

import "./App.css";
import { HomePage } from "./components/HomePage";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import { EachQuestion } from "./components/EachQuestion";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NoPage } from "./components/NoPage";

type quizzProps = {
  question: string
  incorrect_answers: string[]
  correct_answer: string
}
type eachQuizzProps = {
  eachQuestionId: string
  question: string
  options: string[]
}
interface selectedOptionProps extends eachQuizzProps
 {
  selectedAns: string
  answer: string
} 
export default function App() {
  const [start, setStart] = useState(false);
  const [quizz, setQuizz] = useState([]);

  const [playAgain, setPlayAgain] = useState(false);
  const [numOfCorrect, setNumOfCorrect] = useState(0);

  const markSelected = function(event: React.ChangeEvent<HTMLInputElement>) {
    const theSelectedOption:selectedOptionProps = quizz.find(
      (el:eachQuizzProps) => el.eachQuestionId === event.target.name
      )!;
      theSelectedOption.selectedAns = event.target.value;
      console.log(quizz)
    }

    function checkAnswers(){
      quizz.forEach((el: selectedOptionProps)=>{
        if(el.selectedAns === el.answer) {
          setNumOfCorrect((prev)=>{
            return prev + 1
          })
        }
        
        if(el.selectedAns !== el.answer) {
          return document.getElementsByName(el.eachQuestionId).forEach((eachInput:any)=>{
            if(eachInput.value === el.answer){
              eachInput.classList.add('correct-answer')
            }
          })
        }
      })
      setPlayAgain(true)
    }
    function playAgainFn(){
      setStart(false)
      setPlayAgain(false)
    }

  useEffect(() => {
    async function getQuizz() {
      const res = await fetch('https://opentdb.com/api.php?amount=5')
      const data = await res.json()

      setQuizz(data.results.map((data: quizzProps) => {
        return {
          eachQuestionId: nanoid(),
          question: decode(data.question),
          options: shuffleArray([
            ...data.incorrect_answers,
            data.correct_answer,
          ]),
          answer: data.correct_answer
        };
      }))
      console.log(quizz)
    }
    getQuizz()
  }, [start])

  const quizzArray = quizz.map((eachquizz: eachQuizzProps) => {
      return (
        <EachQuestion 
        id={eachquizz.eachQuestionId}
        question={eachquizz.question}
        options={eachquizz.options}
        markSelected={markSelected}
        />
      )
  })

  function shuffleArray(array: string[] | boolean[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    array.forEach((el: any) => decode(el))
    return array;
  }

  return (
    // <BrowserRouter>
    //     <Routes>
    //       <Route index element={<HomePage setStart={setStart} id={nanoid()}/>} />
    //       <Route path="/start-quizz" element={
    //         <>
    //         {<div className="quizz-wrapper"> {quizzArray} </div>}
    //         {!playAgain && <button className="submit-btn" onClick={checkAnswers}>Check Answers</button>}
    //         {playAgain && 
    //           <div className="btn-flex">
    //           <button className="play-again-btn" onClick={playAgainFn}>Play Again</button>
    //           <h4 className="text">You scored {numOfCorrect} of {quizz.length}</h4>
    //           </div>
    //         }
    //         </>
    //       } />
    //       <Route path="*" element={<NoPage />} />
    //       <Route />
    //     </Routes>
    //   </BrowserRouter>
    <main>
      {!start && <HomePage setStart={setStart} id={nanoid()} />}
      {start && <div className="quizz-wrapper"> {quizzArray} </div>}
      {!playAgain && <button className="submit-btn" onClick={checkAnswers}>Check Answers</button>}
      {playAgain && 
      <div className="btn-flex">
        <button className="play-again-btn" onClick={playAgainFn}>Play Again</button>
        <h4 className="text">You scored {numOfCorrect} of {quizz.length}</h4>
      </div>
        }
    </main>
  )
}