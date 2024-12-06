import {
  CircleCheckBig,
  CircleX,
  Eye,
  IndianRupee,
  Loader2,
  LockKeyhole,
  TriangleAlert,
} from "lucide-react";
import ChapterList from "./ChapterList";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import ReactPlayer from "react-player";
import {
  useLazyFetchCourseProgressInfoQuery,
  useUpdateChapterProgessMutation,
  useUpdateCourseProgessMutation,
  useUpdateVideoChangeIdxMutation,
  useUpdateVideoProgessMutation,
} from "../features/api/courseProgressApi";
import { useEffect, useState } from "react";
import {
  courseProgressResType,
  courseProgressType,
  updateChapterProgress,
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

  const [newPaymentSession, { isLoading: isCourseUpdateLoading1 }] =
    useNewPaymentSessionMutation();

  const [updateCourseProgess, { isLoading: isCourseUpdateLoading2 }] =
    useUpdateCourseProgessMutation();

  const [updateChapterProgress, { isLoading: isChapterUpdateLoading }] =
    useUpdateChapterProgessMutation();

  const [updateVideoProgess] = useUpdateVideoProgessMutation();

  const [updateVideoChangeIdx] = useUpdateVideoChangeIdxMutation();

  const navigate = useNavigate();
  const [courseProgressInfo, setCourseProgressInfo] =
    useState<courseProgressType>();
  const [currChapterIdx, setCurrChapterIdx] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [progressPerc, setProgressPerc] = useState<number>(50);

  useEffect(() => {
    const fetchCourseProgressData = async () => {
      const res: courseProgressResType = await fetchCourseProgressInfo({
        progresscode,
      }).unwrap();

      if (res && res.courseProgressInfo) {
        setCourseProgressInfo(res.courseProgressInfo);
        setProgressPerc(
          (res.courseProgressInfo.chapters.filter(
            (data) => data.isChapterCompleted === true
          ).length /
            res.courseProgressInfo.chapters.length) *
            100
        );
        console.log(res.courseProgressInfo);
      }
    };
    fetchCourseProgressData();
  }, [progresscode, fetchCourseProgressInfo]);

  const progressPercCal = (): number => {
    if (courseProgressInfo) {
      const noOfChaptersCompleted: number = courseProgressInfo.chapters.filter(
        (data) => data.isChapterCompleted === true
      ).length;
      const progressPerc =
        (noOfChaptersCompleted / courseProgressInfo.chapters.length) * 100;

      return progressPerc;
    }
    return 0;
  };

  const handleChapterChange = async (idx: number) => {
    if (idx !== currChapterIdx) {
      try {
        const inputData = {
          courseProgressId: progresscode,
          idx,
        };
        const res: courseProgressResType = await updateVideoChangeIdx(
          inputData
        ).unwrap();
        if (res.courseProgressInfo) {
          setCourseProgressInfo(res.courseProgressInfo);
          setProgressPerc(progressPercCal);
          setCurrChapterIdx(idx);
          setIsPlaying(true);
        }
      } catch (error: any) {
        toast.error(error.data.apiMsg, {
          style: toastStyles.error,
        });
      }
    }
  };

  const handleUpdateChapterProgress = async (idx: number) => {
    if (courseProgressInfo && courseProgressInfo.isCourseBought) {
      const inputData: updateChapterProgress = {
        courseProgressId: progresscode,
        idx,
        status: !courseProgressInfo.chapters[idx].isChapterCompleted,
      };
      try {
        const res: courseProgressResType = await updateChapterProgress(
          inputData
        ).unwrap();
        if (res.apiMsg) {
          setCourseProgressInfo(res.courseProgressInfo);
          setProgressPerc(progressPercCal);
          if (res.apiMsg === "Congrats...You've Completed this Course!!!") {
            setShowConfetti(true);
            setTimeout(() => {
              navigate("/");
            }, 10000);
          } else if (res.apiMsg === '"Course Progress Updated"') {
            toast.success(res.apiMsg, {
              style: toastStyles.success,
            });
          }
        }
      } catch (error: any) {
        toast.error(error.data.apiMsg, {
          style: toastStyles.error,
        });
      }
    }
  };

  const handleCourseUpdate = async () => {
    if (courseProgressInfo) {
      if (courseProgressInfo.isCourseBought) {
        try {
          const status: boolean = courseProgressInfo.isCourseCompleted
            ? false
            : true;

          const res: courseProgressResType = await updateCourseProgess({
            courseProgressId: progresscode,
            status,
          }).unwrap();

          if (res.courseProgressInfo) {
            setCourseProgressInfo(res.courseProgressInfo);
            setProgressPerc(progressPercCal);
            if (status) {
              setShowConfetti(true);
              setTimeout(() => {
                navigate("/");
              }, 10000);
            } else {
              setCurrChapterIdx(0);
            }
            toast.success(res.apiMsg, {
              style: toastStyles.success,
            });
          }
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

  const handleNextVideo = async () => {
    if (courseProgressInfo && courseProgressInfo.chapters) {
      if (courseProgressInfo.isCourseBought) {
        const progressInfo: string[] = courseProgressInfo.chapters
          .filter((data) => data.isChapterCompleted === true)
          .map((data) => data.chapterTitle);
        const isNowCompleted =
          progressInfo.length >= courseProgressInfo.chapters.length - 1
            ? true
            : false;
        const inputData = {
          courseProgressId: progresscode,
          idx: currChapterIdx,
          isCourseCompleted: isNowCompleted,
        };
        const res: courseProgressResType = await updateVideoProgess(
          inputData
        ).unwrap();
        if (res.courseProgressInfo) {
          setCourseProgressInfo(res.courseProgressInfo);
          setProgressPerc(progressPercCal);
          // setCurrChapterIdx(res.courseProgressInfo.currChapterIdx);
          toast.success(res.apiMsg, {
            style: toastStyles.success,
          });
          if (currChapterIdx === courseProgressInfo.chapters.length - 1) {
            setCurrChapterIdx(0);
            setIsPlaying(false);
          } else {
            setCurrChapterIdx((prevData) => prevData + 1);
            setIsPlaying(true);
          }
          if (isNowCompleted) {
            setShowConfetti(true);
            setTimeout(() => {
              navigate("/");
            }, 10000);
          }
        }
      } else {
        if (currChapterIdx === courseProgressInfo.chapters.length - 1) {
          setCurrChapterIdx(0);
          setIsPlaying(false);
        } else {
          setCurrChapterIdx((prevData) => prevData + 1);
          setIsPlaying(true);
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
                courseProgressInfo={courseProgressInfo}
                currChapterIdx={currChapterIdx}
                isChapterUpdateLoading={isChapterUpdateLoading}
                handleChapterChange={handleChapterChange}
                handleUpdateChapterProgress={handleUpdateChapterProgress}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        {courseProgressInfo ? (
          <div className="h-full w-full">
            <div className="divCenter md:ml-12 my-8">
              {courseProgressInfo.isCourseBought ||
              currChapterIdx === courseProgressInfo.freeChapterIdx ? (
                <ReactPlayer
                  width={900}
                  height={450}
                  className="w-full h-full"
                  onEnded={handleNextVideo}
                  playing={isPlaying}
                  url={
                    courseProgressInfo.chapters[currChapterIdx].chapterVidURL
                  }
                  controls
                />
              ) : (
                <div className="w-full min-h-96 divCenter text-xl">
                  <TriangleAlert className="mx-2 text-xl text-amber-500" />
                  <div>
                    {" "}
                    You Have not Purchased this Course...Please Purchase this
                    Course to Unloclk all the Chapters
                  </div>
                </div>
              )}
            </div>
            <div className="md:mx-40">
              <div className="flex align-center justify-between flex-col md:flex-row w-full mb-2">
                <h1 className="text-3xl text-hvrBrwn font-bold">
                  {courseProgressInfo.name}
                </h1>
                <div className="divCenter gap-4">
                  {courseProgressInfo.isCourseBought ? (
                    courseProgressInfo.isCourseCompleted ? (
                      <div className="bg-green-100 divCenter px-2 h-full w-full text-center text-lg rounded-lg">
                        <CircleCheckBig className="mx-2" />
                        Course Completed
                      </div>
                    ) : (
                      <div className="bg-green-100 divCenter px-2 h-full w-full text-center text-lg rounded-lg overflow-hiden relative">
                        <div
                          className="absolute top-0 left-0 h-full rounded-lg bg-green-400"
                          style={{ width: `${progressPerc}%` }}
                        ></div>
                        <div className="relative z-10 divCenter h-full w-full">
                          <Eye className="mx-4" />
                          {progressPerc}% Completed
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="bg-slate-400 divCenter px-2 h-full w-full text-center text-lg rounded-lg">
                      <LockKeyhole className="mx-2" />
                      Course Locked
                    </div>
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
                      ) : courseProgressInfo.isCourseCompleted ? (
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
                  {courseProgressInfo.isCourseBought
                    ? courseProgressInfo.chapters[0].chapterDesc
                    : "..."}
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
