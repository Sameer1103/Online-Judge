import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} exact />
          <Route path="/problems/:id" Component={ProblemPage} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
