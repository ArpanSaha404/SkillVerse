import {
  CircleCheck,
  Eye,
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
import React, { useState } from "react";
import Loading from "./Loading";
import {
  chapterProgressType,
  courseProgressType,
} from "../types/courseProgress";
import { toast, Toaster } from "sonner";
import { toastStyles } from "./toastStyles";

interface chaptersListProps {
  courseProgressInfo: courseProgressType;
  currChapterIdx: number;
  isChapterUpdateLoading: boolean;
  handleChapterChange: (idx: number) => void;
  handleUpdateChapterProgress: (idx: number) => void;
}

interface mobileChaptersListProps {
  courseProgressInfo: courseProgressType;
  isChapterUpdateLoading: boolean;
  freeChapterIdx: number;
  isCourseBought: boolean;
  currChapterIdx: number;
  handleUpdateChapterProgress: (idx: number) => void;
}

const ChapterList: React.FC<chaptersListProps> = ({
  courseProgressInfo,
  currChapterIdx,
  isChapterUpdateLoading,
  handleChapterChange,
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

  const handleCourseAlert = (idx: number) => {
    if (
      !courseProgressInfo.isCourseBought &&
      idx !== courseProgressInfo.freeChapterIdx
    ) {
      toast.error("Please Purchase Course to View Details!!!", {
        style: toastStyles.error,
      });
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex items-start justify-between m-4">
        <div className="md:hidden lg:hidden">
          {courseProgressInfo ? (
            <MobileChapterList
              courseProgressInfo={courseProgressInfo}
              isChapterUpdateLoading={isChapterUpdateLoading}
              freeChapterIdx={courseProgressInfo.freeChapterIdx}
              isCourseBought={courseProgressInfo.isCourseBought}
              currChapterIdx={currChapterIdx}
              handleUpdateChapterProgress={handleUpdateChapterProgress}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="hidden md:divCenter flex-col space-y-8 w-full">
          <h1 className="text-xl font-semibold">Chapter List :</h1>
          {courseProgressInfo ? (
            <div className="flex w-full items-start justify-start space-y-4 flex-col">
              {courseProgressInfo.chapters.map(
                (data: chapterProgressType, idx: number) => (
                  <div
                    key={idx}
                    className="divCenter flex-col h-auto w-full rounded-lg border-2 text-center text-xl hover:bg-gray-100"
                    onClick={() => handleCourseAlert(idx)}
                    style={{
                      backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                      borderColor: courseProgressInfo.isCourseBought
                        ? idx === currChapterIdx
                          ? "#F59E0B"
                          : data.isChapterCompleted
                          ? "#22C55E"
                          : "#2a0800"
                        : "#2a0800",
                    }}
                  >
                    <button
                      onClick={() => handleChapterBox(idx)}
                      className="divCenter px-4 py-2 h-full w-full border-solid border-b-2 shadow-none bg-white text-black hover:bg-gray-100"
                      style={{
                        backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                        color: courseProgressInfo.isCourseBought
                          ? idx === currChapterIdx
                            ? "#F59E0B"
                            : data.isChapterCompleted
                            ? "#22C55E"
                            : "#2a0800"
                          : "#2a0800",
                      }}
                    >
                      {courseProgressInfo.isCourseBought ? (
                        idx === currChapterIdx ? (
                          <Eye className="mr-2" />
                        ) : data.isChapterCompleted ? (
                          <CircleCheck className="mr-2" />
                        ) : (
                          <LockKeyholeOpen className="mr-2" />
                        )
                      ) : idx === courseProgressInfo.freeChapterIdx ? (
                        <LockKeyholeOpen className="mr-2" />
                      ) : (
                        <LockKeyhole className="mr-2" />
                      )}
                      {data.chapterTitle}
                    </button>
                    <div className="w-full space-y-4">
                      {isIdx === idx &&
                      isDescVisible &&
                      (courseProgressInfo.isCourseBought ||
                        idx === courseProgressInfo.freeChapterIdx) ? (
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
                            {isChapterUpdateLoading ? (
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
  courseProgressInfo,
  isChapterUpdateLoading,
  freeChapterIdx,
  isCourseBought,
  currChapterIdx,
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
        {courseProgressInfo ? (
          <SheetDescription className="flex-1">
            <div className="mt-4 text-hvrBrwn text-xl space-y-4">
              {courseProgressInfo.chapters.map(
                (data: chapterProgressType, idx: number) => (
                  <div
                    key={idx}
                    className="divCenter flex-col h-auto w-full rounded-lg border-2 text-center text-xl hover:bg-gray-100"
                    style={{
                      backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                      borderColor: courseProgressInfo.isCourseBought
                        ? idx === currChapterIdx
                          ? "#F59E0B"
                          : data.isChapterCompleted
                          ? "#22C55E"
                          : "#2a0800"
                        : "#2a0800",
                    }}
                  >
                    <button
                      onClick={() => handleChapterBox(idx)}
                      className="divCenter px-4 py-2 h-full w-full border-solid border-b-2 shadow-none bg-white text-black hover:bg-gray-100"
                      style={{
                        backgroundColor: idx === isIdx ? "#f3f4f6" : "",
                        color: courseProgressInfo.isCourseBought
                          ? idx === currChapterIdx
                            ? "#F59E0B"
                            : data.isChapterCompleted
                            ? "#22C55E"
                            : "#2a0800"
                          : "#2a0800",
                      }}
                    >
                      {courseProgressInfo.isCourseBought ? (
                        idx === currChapterIdx ? (
                          <Eye className="mr-2" />
                        ) : data.isChapterCompleted ? (
                          <CircleCheck className="mr-2" />
                        ) : (
                          <LockKeyholeOpen className="mr-2" />
                        )
                      ) : idx === courseProgressInfo.freeChapterIdx ? (
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
                            {isChapterUpdateLoading ? (
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
