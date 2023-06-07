import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./components/HomePage";
import { QuizPage } from "./components/QuizzPage";
import { NoPage } from "./components/NoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/start-quizz" element={<QuizPage />} />
          <Route path="*" element={<NoPage />} />
          <Route />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
