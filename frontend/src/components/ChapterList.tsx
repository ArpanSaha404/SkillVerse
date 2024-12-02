import {
  Loader2,
  LockKeyhole,
  LockKeyholeOpen,
  TableOfContents,
} from "lucide-react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import {
  chapterProgressResType,
  chapterProgressType,
  commonProgressResType,
  updateChapterProgress,
} from "../types/courseProgress";
import {
  useLazyFetchChapterProgressInfoQuery,
  useUpdateChapterProgessMutation,
} from "../features/api/courseProgressApi";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";

interface chaptersListProps {
  progresscode: string;
  freeChapterIdx: number;
  isCourseBought: boolean;
  handleChapterChange: (idx: number) => void;
}

interface mobileChaptersListProps {
  chapterProgressInfo: chapterProgressType[];
  isLoading: boolean;
  freeChapterIdx: number;
  isCourseBought: boolean;
  handleUpdateChapterProgress: (idx: number) => void;
}

const ChapterList: React.FC<chaptersListProps> = ({
  freeChapterIdx,
  isCourseBought,
  progresscode,
  handleChapterChange,
}) => {
  const [fetchChapterProgressInfo, { isLoading }] =
    useLazyFetchChapterProgressInfoQuery();

  const [chapterProgressInfo, setChapterProgressInfo] =
    useState<chapterProgressType[]>();
  const [isIdx, setIsIdx] = useState<number>();
  const [isDescVisible, setIsDescVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchChapterProgressData = async () => {
      const res: chapterProgressResType = await fetchChapterProgressInfo({
        progresscode,
      }).unwrap();

      if (res && res.chapterProgressInfo) {
        setChapterProgressInfo(res.chapterProgressInfo);
      }
    };
    fetchChapterProgressData();
  }, [progresscode, fetchChapterProgressInfo]);

  const [updateCourseProgess, { isLoading: isUpdateLoading }] =
    useUpdateChapterProgessMutation();

  const handleChapterBox = (idx: number) => {
    if (idx === isIdx) {
      setIsDescVisible(!isDescVisible);
    } else {
      setIsDescVisible(true);
    }
    setIsIdx(idx);
  };

  const handleCourseAlert = (idx: number) => {
    if (!isCourseBought && idx !== freeChapterIdx) {
      toast.error("Please Purchase Course to View Details!!!", {
        style: toastStyles.error,
      });
    }
  };

  const handleUpdateChapterProgress = async (idx: number) => {
    if (chapterProgressInfo) {
      const inputData: updateChapterProgress = {
        courseProgressId: progresscode,
        idx,
        status: !chapterProgressInfo[idx].isChapterCompleted,
      };
      try {
        const res: commonProgressResType = await updateCourseProgess(
          inputData
        ).unwrap();
        if (res.apiMsg) {
          const updatedChapterInfo: chapterProgressResType =
            await fetchChapterProgressInfo({
              progresscode,
            }).unwrap();
          setChapterProgressInfo(updatedChapterInfo.chapterProgressInfo);
          toast.success(res.apiMsg, {
            style: toastStyles.success,
          });
        }
      } catch (error: any) {
        toast.error(error.data.apiMsg, {
          style: toastStyles.error,
        });
      }
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex items-start justify-between m-4">
        <div className="md:hidden lg:hidden">
          {chapterProgressInfo ? (
            <MobileChapterList
              chapterProgressInfo={chapterProgressInfo}
              isLoading={isLoading}
              freeChapterIdx={freeChapterIdx}
              isCourseBought={isCourseBought}
              handleUpdateChapterProgress={handleUpdateChapterProgress}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="hidden md:divCenter flex-col space-y-8 w-full">
          <h1 className="text-xl font-semibold">Chapter List :</h1>
          {chapterProgressInfo ? (
            <div className="flex w-full items-start justify-start space-y-4 flex-col">
              {chapterProgressInfo.map(
                (data: chapterProgressType, idx: number) => (
                  <div
                    key={idx}
                    className="divCenter flex-col h-auto w-full rounded-lg border-2 border-brwn text-center text-xl hover:bg-gray-100"
                    onClick={() => handleCourseAlert(idx)}
                    style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                  >
                    <button
                      onClick={() => handleChapterBox(idx)}
                      className="divCenter px-4 py-2 h-full w-full ext-brwn border-solid border-b-2 border-hvrBrwn shadow-none bg-white text-black hover:bg-gray-100"
                      style={{
                        backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                      }}
                    >
                      {isCourseBought ? (
                        <LockKeyholeOpen className="mr-2" />
                      ) : idx === freeChapterIdx ? (
                        <LockKeyholeOpen className="mr-2" />
                      ) : (
                        <LockKeyhole className="mr-2" />
                      )}
                      {data.chapterTitle}
                    </button>
                    <div className="w-full space-y-4">
                      {isIdx === idx &&
                      isDescVisible &&
                      (isCourseBought || idx === freeChapterIdx) ? (
                        <div>
                          <div>
                            {data.chapterDesc
                              ? data.chapterDesc
                              : "No Description Provided for this Chapter"}
                          </div>
                          <div className="w-auto flex justify-end items-end mx-4 my-4 gap-4">
                            <Button
                              onClick={() => {
                                setIsDescVisible(false);
                                handleChapterChange(idx);
                              }}
                              className="bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                            >
                              {data.isChapterCompleted
                                ? "Rewatch Video"
                                : "Watch Video"}
                            </Button>
                            {isUpdateLoading ? (
                              <Button
                                disabled
                                className=" divCenter gap-4 py-2 mt-4 bg-hdrBrwn text-white rounded-md"
                              >
                                <Loader2 className="animate-spin" /> Please
                                Wait...
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  setIsDescVisible(false);
                                  handleUpdateChapterProgress(idx);
                                }}
                                className="bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                              >
                                {data.isChapterCompleted
                                  ? "Mark as Incomplete"
                                  : "Mark as Complete"}
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <>
              <Loading skeletonType="chapterList" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MobileChapterList: React.FC<mobileChaptersListProps> = ({
  chapterProgressInfo,
  isLoading,
  freeChapterIdx,
  isCourseBought,
  handleUpdateChapterProgress,
}) => {
  const [isIdx, setIsIdx] = useState<number>();
  const [isDescVisible, setIsDescVisible] = useState<boolean>(false);

  const handleChapterBox = (idx: number) => {
    if (idx === isIdx) {
      setIsDescVisible(!isDescVisible);
    } else {
      setIsDescVisible(true);
    }
    setIsIdx(idx);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button className="rounded-md bg-brwn hover:bg-hvrBrwn">
          <TableOfContents /> Chapter List
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col">
        <SheetHeader className="my-8">
          <SheetTitle className="divCenter text-2xl text-hvrBrwn">
            Chapter List
          </SheetTitle>
        </SheetHeader>
        <Separator />
        {chapterProgressInfo ? (
          <SheetDescription className="flex-1">
            <div className="mt-4 text-hvrBrwn text-xl space-y-4">
              {chapterProgressInfo.map(
                (data: chapterProgressType, idx: number) => (
                  <div
                    key={idx}
                    className="divCenter flex-col h-auto w-full rounded-lg border-2 border-brwn text-center text-xl hover:bg-gray-100"
                    style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                  >
                    <button
                      onClick={() => handleChapterBox(idx)}
                      className="divCenter px-4 py-2 h-full w-full text-brwn border-solid border-b-2 border-hvrBrwn shadow-none bg-white text-black hover:bg-gray-100"
                      style={{
                        backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                      }}
                    >
                      {isCourseBought ? (
                        <LockKeyholeOpen className="mr-2" />
                      ) : idx === freeChapterIdx ? (
                        <LockKeyholeOpen className="mr-2" />
                      ) : (
                        <LockKeyhole className="mr-2" />
                      )}
                      {data.chapterTitle}
                    </button>
                    <div className="w-full space-y-4">
                      {isIdx === idx &&
                      isDescVisible &&
                      (isCourseBought || idx === freeChapterIdx) ? (
                        <div>
                          <div>
                            {data.chapterDesc
                              ? data.chapterDesc
                              : "No Description Provided for this Chapter"}
                          </div>
                          <div className="w-auto flex justify-end items-end mx-4 my-4 gap-4">
                            {isLoading ? (
                              <Button
                                disabled
                                className=" divCenter gap-4 py-2 mt-4 bg-hdrBrwn text-white rounded-md"
                              >
                                <Loader2 className="animate-spin" /> Please
                                Wait...
                              </Button>
                            ) : (
                              <Button
                                onClick={() => {
                                  setIsDescVisible(false);
                                  handleUpdateChapterProgress(idx);
                                }}
                                className="bg-brwn text-white rounded-md hover:bg-hvrBrwn transition-transform duration-300 ease-in-out active:scale-90"
                              >
                                {data.isChapterCompleted
                                  ? "Mark as Incomplete"
                                  : "Mark as Complete"}
                              </Button>
                            )}
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          </SheetDescription>
        ) : (
          <Loading skeletonType="chapterList" />
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ChapterList;
