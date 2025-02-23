import { useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useLazyCheckNewCourseQuery } from "../features/api/teacherApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";

const NewCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");

  const [checkNewCourse] = useLazyCheckNewCourseQuery();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await checkNewCourse(courseTitle);
      if (res && res.data) {
        navigate(`/edit-course?course=${courseTitle}&new=true`);
      } else if (res.error) {
        if ("data" in res.error) {
          const errorInfo: any = res.error.data;
          toast.error(errorInfo.apiMsg, {
            style: toastStyles.error,
          });
        }
      }
    } catch (error: any) {
      toast.error(error.data.apiMsg, {
        style: toastStyles.error,
      });
    }
  };

  const handleCancel = () => {
    setCourseTitle("");
    navigate("/created-courses");
  };

  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Toaster />
      <div className="divCenter w-full h-full">
        <div>
          <h1 className="text-hdrBrwn text-4xl">Name your Course</h1>
          <br />
          <h1 className="text-hdrBrwn text-2xl">
            What would you like to name your course? You can change this later
          </h1>
          <form
            onSubmit={handleSubmit}
            className="max-w-md p-4 rounded-lg mt-4"
          >
            <label className="block text-hvrBrwn font-medium mb-2">
              Course Title :
            </label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-hvrBrwn"
              placeholder="e.g. Advanced Web Development"
            />
            <div className="mt-4 flex justify-start items-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="p-2 bg-white text-brwn rounded-md hover:underline transition-transform duration-300 ease-in-out active:scale-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="p-2 bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewCourse;
