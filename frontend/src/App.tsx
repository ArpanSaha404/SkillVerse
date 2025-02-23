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
import ProtectedRoutes from "./components/ProtectedRoutes";
import UpdateProfile from "./components/UpdateProfile";
import MyProfile from "./components/MyProfile";
import MyCourses from "./components/MyCourses";
import CreatedCourses from "./components/CreatedCourses";
import NewCourse from "./components/NewCourse";
import EditCourses from "./components/EditCourses";
import EditChapters from "./components/EditChapters";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <ProtectedRoutes> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-account" element={<Verifyaccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route
            path="/courses"
            element={
              <ProtectedRoutes>
                <CoursesPage />
              </ProtectedRoutes>
            }
          />
          <Route path="/courses/:searchQuery" element={<CoursesPage />} />
          <Route path="/course-details/:id" element={<CourseDetails />} />
          <Route path="/course-progress" element={<CourseProgress />} />

          <Route path="/upload" element={<UpdateProfile />} />
          <Route path="/loading" element={<Loading />} />

          {/* Teacher */}
          <Route path="/created-courses" element={<CreatedCourses />} />
          <Route path="/create-newcourse" element={<NewCourse />} />
          <Route path="/edit-course" element={<EditCourses />} />
          <Route path="/edit-chapter" element={<EditChapters />} />

          {/* All Other Paths to Home */}
          <Route path="*" element={<LandingPage />} />
          {/* </ProtectedRoutes> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
