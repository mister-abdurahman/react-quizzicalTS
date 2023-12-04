import { Link } from "react-router-dom";
// type startQuizProps = {setStart: React.Dispatch<React.SetStateAction<boolean>>}
// export function HomePage({setStart}: startQuizProps) {
export function HomePage() {
  return (
    <div className="home">
      {/* <div className="top-blob"></div>
      <div className="bottom-blob"></div> */}
      <h3 className="head-text">Quizzical</h3>
      <p className="description">Play this game to test your IQ power 🔥</p>
      <Link to={"start-quizz"}>
        {/* <button className="start-btn" onClick={() => setStart(true)}>Start Quiz</button> */}
        <button className="start-btn">Start Quiz</button>
      </Link>
    </div>
  );
}
