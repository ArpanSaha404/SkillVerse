import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const CreatedCourses = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/create-newcourse")}>New Course</Button>
    </div>
  );
};

export default CreatedCourses;
