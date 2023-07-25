import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import ProblemPage from "./Pages/ProblemPage";
import { useEffect } from "react";
import { authenticate } from "./service/api";
import { UserState } from "./Context";

function App() {

  const {setUserEmail} = UserState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const data = {
          token: token
        };
        const response = await authenticate(data);
        if(response.found == true) setUserEmail(response.email);
        else setUserEmail(undefined);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchData();
  }, []);

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
