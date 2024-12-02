import { IndianRupee, Loader2 } from "lucide-react";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { useEffect, useState } from "react";
import { courseType } from "../types/courses";
import {
  useLazyGetCreatorInfoQuery,
  useLazyGetSingleCourseDataQuery,
} from "../features/api/courseApi";
import ReactPlayer from "react-player";
import { useNewPaymentSessionMutation } from "../features/api/paymentsApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import { paymentRes } from "../types/payments";

const CourseDetails = () => {
  const { id } = useParams();
  const courseId: string = id ? id : "";

  const [getSingleCourseData] = useLazyGetSingleCourseDataQuery();
  const [getCreatorInfo] = useLazyGetCreatorInfoQuery();
  const [newPaymentSession, { isLoading }] = useNewPaymentSessionMutation();

  const userId = useAppSelector((state) => state.auth._id);

  const [singleCourseData, setSingleCourseData] = useState<courseType>();
  const [creatorInfo, setCreatorInfo] = useState<{
    fullName: String;
    image: string;
  }>();

  useEffect(() => {
    const getCourseData = async () => {
      const res = await getSingleCourseData(courseId);
      if (res && res.data) {
        setSingleCourseData(res.data.courseData);
        const picRes = await getCreatorInfo(res.data.courseData.coursePic);
        if (picRes && picRes.data) {
          setCreatorInfo({
            fullName: picRes.data.fullName,
            image: picRes.data.image,
          });
        }
      }
    };
    getCourseData();
  }, [courseId, getSingleCourseData, getCreatorInfo]);

  const navigate = useNavigate();
  const coursesBought = useAppSelector((state) => state.auth.coursesBought);
  const coursesCreated = useAppSelector((state) => state.auth.coursesCreated);

  const isCourseCompleted = true;

  const handleCourseProgress = async () => {
    if (coursesBought.includes(courseId)) {
      if (isCourseCompleted) {
        //Reset Course Completion
      }
      navigate("/course-progress");
    } else {
      try {
        const inputdata = {
          courseId: courseId,
          userId: userId,
        };

        const res: paymentRes = await newPaymentSession(inputdata).unwrap();
        if (res.url) {
          window.location.href = res.url;
        }
        toast.success(res.apiMsg, {
          style: toastStyles.success,
        });
      } catch (error: any) {
        toast.error(error.data.apiMsg, {
          style: toastStyles.error,
        });
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Toaster />
      {singleCourseData ? (
        <div className="divCenter flex-col md:flex-row w-screen">
          <div className="w-1/2 px-8">
            <div className="w-full flex items-start justify-start flex-col space-y-4 text-hvrBrwn my-8">
              <div className="text-5xl font-bold">{singleCourseData.name}</div>
              <div className="flex items-center justify-between w-full">
                <div className="divCenter text-3xl font-bold">
                  <Avatar className="mr-2 h-10 w-10">
                    <AvatarImage src={creatorInfo?.image} />
                    <AvatarFallback>
                      {creatorInfo?.fullName
                        .split(" ")
                        .map((data) => data[0])
                        .join("")}
                    </AvatarFallback>
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
              <div className="md:ml-32">
                <ReactPlayer
                  className="w-full h-full"
                  url={
                    singleCourseData.chapters[singleCourseData.freeChapterIdx]
                      .chapterVidURL
                  }
                  controls
                />
              </div>
              <div className="w-5/6 flex items-center justify-end m-8 pr-8 gap-4">
                {!isLoading ? (
                  <Button
                    onClick={handleCourseProgress}
                    className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                  >
                    {coursesBought.includes(courseId) ? (
                      isCourseCompleted ? (
                        "Rewatch Course"
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
                ) : (
                  <Button
                    disabled
                    className="divCenter gap-4 py-2 mt-4 bg-hdrBrwn text-white rounded-md"
                  >
                    <Loader2 className="animate-spin" /> Please Wait...
                  </Button>
                )}
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
