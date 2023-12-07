import { nanoid } from "nanoid";
import { useState } from "react";

export type EachQuestionProps = {
  key?: string;
  question: string;
  options: string[];
  answer: string | boolean;
  // markSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  markSelected?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedAns?: string;
  setTrackScore?: () => void;
};

export function EachQuestion({
  question,
  options,
  answer,
  markSelected,
}: // setTrackScore,
EachQuestionProps) {
  // if(e.target.checked) console.log(e.target.value)
  // const randomId = nanoid()

  function updateScoreTrack(e: React.FormEvent) {
    // e.preventDefault();
    // console.log(e);
  }

  return (
    <div className="each-question">
      <h3>{question}</h3>
      <form action="" className="options" id="the-form">
        {options.map((opt, i) => {
          const randomId = Math.random();
          return (
            <div key={i}>
              <input
                id={opt + randomId}
                className="option-input"
                type="radio"
                name={question}
                value={opt}
                onChange={(event) => markSelected && markSelected(event)}
                onClick={(e: React.FormEvent) => updateScoreTrack(e)}
              />
              <label
                htmlFor={opt + randomId}
                className={`option-input-label ${question}`}
              >
                {opt}
              </label>
            </div>
          );
        })}
      </form>
    </div>
  );
}
