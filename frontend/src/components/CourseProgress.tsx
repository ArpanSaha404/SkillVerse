import { CircleCheckBig, CircleX, IndianRupee, Loader2 } from "lucide-react";
import ChapterList from "./ChapterList";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ReactPlayer from "react-player";
import {
  useLazyFetchCourseProgressInfoQuery,
  useUpdateCourseProgessMutation,
} from "../features/api/courseProgressApi";
import { useEffect, useState } from "react";
import {
  courseProgressResType,
  courseProgressType,
} from "../types/courseProgress";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentRes } from "../types/payments";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";
import { useNewPaymentSessionMutation } from "../features/api/paymentsApi";
import Confetti from "react-confetti";

const CourseProgress = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const progresscode = queryParams.get("progresscode") || "";

  const [fetchCourseProgressInfo, { isLoading }] =
    useLazyFetchCourseProgressInfoQuery();

  const [courseProgressInfo, setCourseProgressInfo] =
    useState<courseProgressType>();

  const [newPaymentSession, { isLoading: isCourseUpdateLoading1 }] =
    useNewPaymentSessionMutation();

  const [updateCourseProgess, { isLoading: isCourseUpdateLoading2 }] =
    useUpdateCourseProgessMutation();

  const navigate = useNavigate();
  const [currChapterIdx, setCurrChapterIdx] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);

  useEffect(() => {
    const fetchCourseProgressData = async () => {
      const res: courseProgressResType = await fetchCourseProgressInfo({
        progresscode,
      }).unwrap();

      if (res && res.courseProgressInfo) {
        setCourseProgressInfo(res.courseProgressInfo);
      }
    };
    fetchCourseProgressData();
  }, [progresscode, fetchCourseProgressInfo]);

  const handleChapterChange = (idx: number) => {
    setCurrChapterIdx(idx);
  };

  const handleCourseUpdate = async () => {
    if (courseProgressInfo) {
      if (courseProgressInfo.isCourseBought) {
        const status: boolean = courseProgressInfo.isCourseCompletd
          ? false
          : true;

        const res: courseProgressResType = await updateCourseProgess({
          courseProgressId: progresscode,
          status,
        }).unwrap();
        console.log(res);

        if (res.courseProgressInfo) {
          const updatedInfo: courseProgressResType =
            await fetchCourseProgressInfo({ progresscode }).unwrap();
          if (updatedInfo.courseProgressInfo) {
            setCourseProgressInfo(courseProgressInfo);
            if (status) {
              setShowConfetti(true);
              setTimeout(() => {
                navigate("/");
              }, 10000);
            } else {
              setCurrChapterIdx(0);
            }
          }
          toast.success(res.apiMsg, {
            style: toastStyles.success,
          });
        }
        try {
        } catch (error: any) {
          toast.error(error.data.apiMsg, {
            style: toastStyles.error,
          });
        }
      } else {
        try {
          const inputdata = {
            courseId: courseProgressInfo.courseId,
            userId: courseProgressInfo.userId,
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
    }
  };

  if (!progresscode) {
    return (
      <div className="h-screen w-screen divCenter">
        <div className="divCenter text-2xl font-semibold text-red-500">
          <CircleX size={40} className="pr-2" />
          No Relevant Courses Found...
        </div>
      </div>
    );
  }

  if (isLoading || !courseProgressInfo) {
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

  return (
    <div>
      <Navbar />
      <Toaster />
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="md:divCenter w-full">
        <div className="w-1/4 md:my-40 md:border-solid md:border-r-2 md:border-brwn">
          <div className="w-full h-full md:divCenter">
            {courseProgressInfo ? (
              <ChapterList
                progresscode={progresscode}
                freeChapterIdx={courseProgressInfo.freeChapterIdx}
                isCourseBought={courseProgressInfo.isCourseBought}
                handleChapterChange={handleChapterChange}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {courseProgressInfo ? (
          <div className="h-full w-full">
            <div className="divCenter md:ml-12 my-8">
              <ReactPlayer
                width={900}
                height={450}
                className="w-full h-full"
                url={courseProgressInfo.chapters[currChapterIdx].chapterVidURL}
                controls
              />
            </div>
            <div className="md:mx-40">
              <div className="flex align-center justify-between flex-col md:flex-row w-full mb-2">
                <h1 className="text-3xl text-hvrBrwn font-bold">
                  {courseProgressInfo.name}
                </h1>
                <div className="divCenter gap-4">
                  {courseProgressInfo.isCourseCompletd ? (
                    <div className="bg-green-100 divCenter px-2 h-full text-center text-lg rounded-lg">
                      <CircleCheckBig className="mr-2" />
                      Course Completed
                    </div>
                  ) : (
                    <></>
                  )}
                  {!isCourseUpdateLoading1 || isCourseUpdateLoading2 ? (
                    <Button
                      onClick={handleCourseUpdate}
                      className="text-white bg-hvrBrwn rounded-md hover:bg-hdrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                    >
                      {!courseProgressInfo.isCourseBought ? (
                        <>
                          Enroll for : <IndianRupee />{" "}
                          {courseProgressInfo.price}
                        </>
                      ) : courseProgressInfo.isCourseCompletd ? (
                        "Reset Course Progress"
                      ) : (
                        "Mark Course as Complete"
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
              <Separator />
              <div className="flex flex-col justify-start items-start my-2 text-xl text-hvrBrwn font-semibold">
                Description :
                <div className="text-lg font-medium">
                  {courseProgressInfo.chapters[0].chapterDesc}
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
