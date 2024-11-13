import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route path="/*" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
