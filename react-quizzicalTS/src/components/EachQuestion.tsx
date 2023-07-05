import { useState } from "react";

export type EachQuestionProps = {
  key: string;
  question: string;
  options: string[];
  answer: string | boolean;
};

export function EachQuestion({ question, options, answer }: EachQuestionProps) {
  const [selectedAns, setSelectedAns] = useState([]);
  return (
    <div className="each-question">
      <h3>{question}</h3>
      <ul className="options">
        {options.map((opt, i) => (
          // <li key={i}>{opt}</li>
          <>
            <input
              id={opt}
              className="option-input"
              type="radio"
              name={question}
              value={opt}
            />
            <label htmlFor={opt} className="option-input-label">
              {opt}
            </label>
          </>
        ))}
      </ul>
    </div>
  );
} 
