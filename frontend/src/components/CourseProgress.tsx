import { CircleCheckBig, IndianRupee } from "lucide-react";
import ChapterList from "./ChapterList";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { chapterType } from "../types/courses";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const CourseProgress = () => {
  const [singleCourseData] = useFetch(
    `http://localhost:5000/api/course/singlecourse/673ca1df7844b716f74706dc`
  );

  if (!singleCourseData) {
    return (
      <div className="divCenter w-full">
        <div className="w-1/4">
          <Loading skeletonType="chapterList" />
        </div>
        <div className="w-full">
          <Loading skeletonType="courseProgress" />
        </div>
      </div>
    );
  }

  const isBought: boolean = true;
  const isCourseCompleted = true;
  const chapterList: chapterType[] = singleCourseData.courseData.chapters;
  return (
    <div>
      <Navbar />
      <div className="md:divCenter w-full">
        <div className="w-1/4 md:my-40 md:border-solid md:border-r-2 md:border-brwn">
          <div className="w-full h-full md:divCenter">
            <ChapterList
              chapters={chapterList}
              freeChapterIdx={singleCourseData.courseData.freeChapterIdx}
              isBought={isBought}
            />
          </div>
        </div>
        {singleCourseData ? (
          <div className="h-full w-full">
            <div className="divCenter mx-12 my-8">
              <video className="w-5/6" controls>
                <source src="https://www.youtube.com/watch?v=z_B0PF8Ug00&list=RDpOnW2HytGEY&index=19" />
                Your Browser does not support
              </video>
            </div>
            <div className="md:mx-40">
              <div className="flex align-center justify-between flex-col md:flex-row w-full mb-2">
                <h1 className="text-3xl text-hvrBrwn font-bold">
                  {singleCourseData.courseData.name}
                </h1>
                <div className="divCenter gap-4">
                  {isCourseCompleted ? (
                    <div className="bg-green-100 divCenter px-2 h-full text-center text-lg rounded-lg">
                      <CircleCheckBig className="mr-2" />
                      Course Completed
                    </div>
                  ) : (
                    <></>
                  )}
                  {
                    <Button className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                      {isBought ? (
                        <>
                          Enroll for : <IndianRupee />{" "}
                          {singleCourseData.courseData.price}
                        </>
                      ) : isCourseCompleted ? (
                        "Rewatch Chapter"
                      ) : (
                        "Mark as Complete"
                      )}
                    </Button>
                  }
                </div>
              </div>
              <Separator />
              <div className="flex flex-col justify-start items-start my-2 text-xl text-hvrBrwn font-semibold">
                Description :
                <div className="text-lg font-medium">
                  {singleCourseData.courseData.chapters[0].chapterDesc}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading skeletonType="courseProgress" />
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
