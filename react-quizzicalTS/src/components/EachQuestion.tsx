import { nanoid } from "nanoid";
import { useState } from "react";

export type EachQuestionProps = {
  key: string;
  question: string;
  options: string[];
  answer: string | boolean;
  // markSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  markSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAns: string
};

export function EachQuestion({ question, options, answer, markSelected }: EachQuestionProps) {
    
  // if(e.target.checked) console.log(e.target.value)
  // const randomId = nanoid()

  return (
    <div className="each-question">
      <h3>{question}</h3>
      <form action="" className="options">
        {options.map((opt, i) => { 
          const randomId = Math.random();
          return (
          <>
            <input
              id={opt+randomId}
              className="option-input"
              type="radio"
              name={question}
              value={opt}
              onChange={(event) => markSelected(event)}
            />
            <label htmlFor={opt+randomId} className="option-input-label">
              {opt}
            </label>
          </>
        )})}
      </form>
    </div>
  );
}
