import { IndianRupee } from "lucide-react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { courseType } from "../types/courses";
import { useLazyGetSingleCourseDataQuery } from "../features/api/courseApi";
import axios from "axios";
import { frontend_URL } from "./lib/utils";

const CourseDetails = () => {
  const { id } = useParams();
  const courseId: string = id ? id : "";

  const [singleCourseData, setSingleCourseData] = useState<courseType>();

  const [getSingleCourseData] = useLazyGetSingleCourseDataQuery();

  useEffect(() => {
    const getCourseData = async () => {
      const res = await getSingleCourseData(courseId);
      if (res && res.data) {
        setSingleCourseData(res.data.courseData);
      }
    };
    getCourseData();
  }, [courseId, getSingleCourseData]);

  const navigate = useNavigate();
  const coursesBought = useAppSelector((state) => state.auth.coursesBought);
  const coursesCreated = useAppSelector((state) => state.auth.coursesCreated);

  const isCourseCompleted = true;

  const handleCourseProgress = () => {
    const inputdata = {
      courseId: courseId,
      userId: "67484adb28a7dc8a7f5e9058",
    };
    axios
      .post(`${frontend_URL}/api/payments/payment`, inputdata)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
    // if (coursesBought.includes(courseId)) {
    //   if (isCourseCompleted) {
    //     //Reset Course Completion
    //   }
    //   navigate("/course-progress");
    // } else {
    //   //Go to Payments Page

    //   //For now Navigating to Course Progress
    //   navigate("/course-progress");
    // }
  };

  return (
    <div>
      <Navbar />
      {singleCourseData ? (
        <div className="divCenter flex-col md:flex-row w-screen">
          <div className="w-1/2 px-8">
            <div className="w-full flex items-start justify-start flex-col space-y-4 text-hvrBrwn my-8">
              <div className="text-5xl font-bold">{singleCourseData.name}</div>
              <div className="flex items-center justify-between w-full">
                <div className="divCenter text-3xl font-bold">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {singleCourseData.createdBy}
                </div>
                <div className="border-2 border-hvrBrwn py-2 px-4 rounded-lg text-md text-center font-semibold">
                  {singleCourseData.categories}
                </div>
              </div>
              <div className="text-2xl font-semibold">
                {singleCourseData.subTitle}
              </div>
            </div>
            <Separator />
            <div className="text-xl font-semibold text-hvrBrwn my-8">
              Course Description :
              <div className="text-lg font-medium my-4">
                {singleCourseData.desc}
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
                <Button
                  onClick={handleCourseProgress}
                  className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                >
                  {coursesBought.includes(courseId) ? (
                    isCourseCompleted ? (
                      "Rewatch Chapter"
                    ) : (
                      "Go to Course"
                    )
                  ) : coursesCreated.includes(courseId) ? (
                    "Go to Course"
                  ) : (
                    <>
                      Enroll for : <IndianRupee /> {singleCourseData.price}
                    </>
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
