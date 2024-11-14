import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
