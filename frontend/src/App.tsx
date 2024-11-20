import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Verifyaccount from "./components/Verifyaccount";
import ResetPassword from "./components/ResetPassword";
import CoursesPage from "./components/CoursesPage";
import CourseDetails from "./components/CourseDetails";
import CourseProgress from "./components/CourseProgress";
import Loading from "./components/Loading";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<Verifyaccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course-details" element={<CourseDetails />} />
          <Route path="/course-progress" element={<CourseProgress />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
