import { BookOpen } from "lucide-react";
import FilterCategories from "./FilterCategories";
import useFetch from "../hooks/useFetch";
import { frontend_URL } from "./lib/utils";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { courseType } from "../types/courses";

const CoursesPage = () => {
  const [courseData] = useFetch(`${frontend_URL}/api/course/course`);
  const bought = true;

  return (
    <div>
      <div className="divcenter">
        <Navbar />
        <div className="md:flex md:items-start md:justify-start mt-8">
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
              {courseData.courseData.map((data: courseType, idx: number) => (
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
                        {!bought ? <div>{data.price}</div> : <></>}
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div>{"Progress bar"}</div>
                    <div>{"Percentage"}</div>
                  </div>
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
