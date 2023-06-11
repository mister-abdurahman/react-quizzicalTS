import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { QuizzPage } from "./components/QuizzPage";
import { NoPage } from "./components/NoPage";
import { ReactNode, useEffect, useState } from "react";
// import { decode } from "html-entities";
// import { EachQuestion, EachQuestionProps } from "./components/EachQuestion";
// import { nanoid } from "nanoid";

function App() {

  // const [start, setStart] = useState(false)
  // const [quizz, setQuizz] = useState([]);
  // const [restart, setRestart] = useState(false)
  // const [score, setScore] = useState(0)
  // const [submitted, setSubmitted] = useState(false)
 
  return (
    <>
    {/* {!start && <HomePage setStart={setStart} />} */}
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/start-quizz" element={<QuizzPage />} />
          <Route path="*" element={<NoPage />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
