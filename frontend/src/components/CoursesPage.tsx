import { BookOpen, IndianRupee, Loader2, MoveRight } from "lucide-react";
import FilterCategories from "./FilterCategories";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { courseType } from "../types/courses";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAllCourseDataQuery } from "../features/api/courseApi";
import { useAppSelector } from "../app/hooks";

const CoursesPage = () => {
  const { searchQuery } = useParams<{ searchQuery?: string }>();
  const text = searchQuery || "";
  const [SearchText, setSearchText] = useState<string>(text);

  const { data, isLoading } = useAllCourseDataQuery();
  const [courseData, setCourseData] = useState<courseType[]>([]);

  const navigate = useNavigate();
  const boughtCourses = useAppSelector((state) => state.auth.coursesBought);
  const createdCourses = useAppSelector((state) => state.auth.coursesCreated);

  useEffect(() => {
    if (data && data.courseData) {
      setCourseData(data.courseData);
    }
  }, [data, courseData]);

  const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {};

  return (
    <div>
      <div className="">
        <Navbar />
        <div className="md:w-full w-auto divCenter my-4">
          <div className="gap-4 md:w-1/2 w-full flex divCenter">
            <input
              className="border-hvrBrwn border-2 border-solid rounded-md px-4 h-10 w-3/4"
              name="serachText"
              type="text"
              placeholder="Search for a Course"
              value={SearchText}
              onChange={changeInputHandler}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleSearchClick();
                }
              }}
            />
            {!isLoading ? (
              <Button
                className="h-10 w-12 divCenter bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                onClick={handleSearchClick}
              >
                <MoveRight />
              </Button>
            ) : (
              <Button
                disabled
                className="h-10 w-12 divCenter bg-hdrBrwn text-white rounded-md"
              >
                <Loader2 className="animate-spin" />
              </Button>
            )}
          </div>
        </div>
        <div className="md:flex md:items-start md:justify-start">
          <div className="md:hidden lg:hidden">
            <FilterCategories />
          </div>
          <div className="w-1/4 hidden md:divCenter">
            <div className="w-full mt-24">
              <FilterCategories />
            </div>
          </div>
          {courseData ? (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-2 mx-8">
              {courseData.map((data: courseType, idx: number) => (
                <div
                  key={idx}
                  className="shadow-lg w-full p-4 rounded-lg bg-slate-200"
                >
                  <img
                    className="h-40 w-full rounded-lg object-cover"
                    src={
                      data.coursePic
                        ? data.coursePic
                        : "https://github.com/shadcn.png"
                    }
                    alt="Course_Pic"
                  />
                  <div className="flex flex-col items-start justify-start text-hvrBrwn space-y-2">
                    <h1 className="text-lg font-bold hover:underline mt-2">
                      {data.name}
                    </h1>
                    <h1>{data.createdBy}</h1>
                    <div className="w-full flex items-center justify-between py-2">
                      <div className="text-center divCenter gap-2 text-white bg-hdrBrwn rounded-lg px-2">
                        {data.categories}
                      </div>
                      <div className="flex items-center justify-between text-center">
                        <div className="divCenter">
                          <BookOpen className="mr-2" />
                          {data.chapters?.length || 0} Chapters
                        </div>
                      </div>
                    </div>
                  </div>
                  {boughtCourses.includes(courseData[idx]._id) ? (
                    <div className="w-full flex items-center justify-between">
                      <div>{"Progress bar"}</div>
                      <div>{"Percentage"}</div>
                    </div>
                  ) : createdCourses.includes(courseData[idx]._id) ? (
                    <div className="w-full text-lg font-semibold flex items-center justify-between">
                      <div className="divCenter">Course Created by You</div>
                      <Button
                        onClick={() =>
                          navigate(`/course-details/${courseData[idx]._id}`)
                        }
                        className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Explore Course
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full text-lg font-semibold flex items-center justify-between">
                      <div className="divCenter">
                        <IndianRupee size={18} />
                        {data.price}
                      </div>
                      <Button
                        onClick={() =>
                          navigate(`/course-details/${courseData[idx]._id}`)
                        }
                        className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                      >
                        Explore Course
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Loading skeletonType="courseCards" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
