import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Dashboard from "./pages/Dashboard/Dashboard";
import LiveQuiz from "./pages/LiveQuiz/LiveQuiz";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz/:quizId" element={<LiveQuiz />} />
      </Routes>
    </>
  );
}

export default App;
