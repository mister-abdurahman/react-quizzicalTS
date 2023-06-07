// https://opentdb.com/api.php?amount=5&category=9

import { useEffect, useState } from "react";

export async function QuizPage() {
  const [quizzical, setQuizzical] = useState([]);

  useEffect(()=>{
    const response = fetch(
      "https://opentdb.com/api.php?amount=5&category=9"
    );
    const jsonData = response.json();
    return jsonData;
  }, [])
 
  return (
    <div className="quizz">
      <button className="start-btn">Check Answers</button>
    </div>
  );
}
