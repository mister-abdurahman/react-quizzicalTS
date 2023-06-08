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
import { useEffect, useState } from "react";

function App() {
  return (
    <>
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
