import { IndianRupee } from "lucide-react";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const CourseDetails = () => {
  const [singleCourseData] = useFetch(
    `http://localhost:5000/api/course/singlecourse/673ca1df7844b716f74706dc`
  );

  const isBought: boolean = true;
  const isCourseCompleted = true;

  return (
    <div>
      <Navbar />
      {singleCourseData ? (
        <div className="divCenter flex-col md:flex-row w-screen">
          <div className="w-1/2 px-8">
            <div className="w-full flex items-start justify-start flex-col space-y-4 text-hvrBrwn my-8">
              <div className="text-5xl font-bold">
                {singleCourseData.courseData.name}
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="divCenter text-3xl font-bold">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {singleCourseData.courseData.createdBy}
                </div>
                <div className="text-white bg-hvrBrwn py-2 px-4 rounded-lg text-md text-center font-semibold">
                  {singleCourseData.courseData.categories}
                </div>
              </div>
              <div className="text-2xl font-semibold">
                {singleCourseData.courseData.subTitle}
              </div>
            </div>
            <Separator />
            <div className="text-xl font-semibold text-hvrBrwn my-8">
              Course Description :
              <div className="text-lg font-medium my-4">
                {singleCourseData.courseData.desc}
              </div>
            </div>
          </div>
          <div className="w-full">
            <div className="divCenter flex-col mx-12 my-8">
              <video className="w-5/6" controls>
                <source src="https://www.youtube.com/watch?v=z_B0PF8Ug00&list=RDpOnW2HytGEY&index=19" />
                Your Browser does not support
              </video>
              <div className="w-5/6 flex items-center justify-end m-8 pr-8 gap-4">
                <Button className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90">
                  {isBought ? (
                    <>
                      Enroll for : <IndianRupee />{" "}
                      {singleCourseData.courseData.price}
                    </>
                  ) : isCourseCompleted ? (
                    "Rewatch Chapter"
                  ) : (
                    "Go to Course"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading skeletonType="courseDetails" />
      )}
    </div>
  );
};

export default CourseDetails;
