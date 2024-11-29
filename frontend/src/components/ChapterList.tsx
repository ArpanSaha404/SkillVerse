import { LockKeyhole, LockKeyholeOpen, TableOfContents } from "lucide-react";
import { chapterType } from "../types/courses";
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

interface chaptersListProps {
  chapters: chapterType[];
  freeChapterIdx: number;
  isBought: boolean;
}

const ChapterList: React.FC<chaptersListProps> = ({
  chapters,
  freeChapterIdx,
  isBought,
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

  console.log(chapters);
  console.log(isBought);
  console.log(freeChapterIdx);

  return (
    <div>
      <div className="flex items-start justify-between m-4">
        <div className="md:hidden lg:hidden">
          <MobileChapterList
            chapters={chapters}
            freeChapterIdx={freeChapterIdx}
            isBought={isBought}
          />
        </div>
        <div className="hidden md:divCenter flex-col space-y-8 w-full">
          <h1 className="text-xl font-semibold">Chapter List :</h1>
          {chapters && isBought ? (
            <div className="flex w-full items-start justify-start space-y-4 flex-col">
              {chapters.map((data: chapterType, idx: number) => (
                <div
                  key={idx}
                  className="divCenter flex-col h-auto w-full rounded-lg border-2 border-brwn text-center text-xl hover:bg-gray-100"
                  style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                >
                  <button
                    onClick={() => handleChapterBox(idx)}
                    className="divCenter px-4 py-2 h-full w-full ext-brwn border-solid border-b-2 border-hvrBrwn shadow-none bg-white text-black hover:bg-gray-100"
                    style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                  >
                    {isBought ? (
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
                    (isBought || idx === freeChapterIdx) ? (
                      <div>
                        <div>
                          {data.chapterDesc
                            ? data.chapterDesc
                            : "No Description Provided for this Chapter"}
                        </div>
                        <div className="w-auto flex justify-end items-end mx-4 my-4 gap-4">
                          <Button>Watch Video</Button>
                          <Button>Mark as Complete</Button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <>
              Hello
              <Loading skeletonType="chapterList" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MobileChapterList: React.FC<chaptersListProps> = ({
  chapters,
  freeChapterIdx,
  isBought,
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
        {chapters && freeChapterIdx && isBought ? (
          <SheetDescription className="flex-1">
            <div className="mt-4 text-hvrBrwn text-xl space-y-4">
              {chapters.map((data: chapterType, idx: number) => (
                <div
                  key={idx}
                  className="divCenter flex-col h-auto w-full rounded-lg border-2 border-brwn text-center text-xl hover:bg-gray-100"
                  style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                >
                  <button
                    onClick={() => handleChapterBox(idx)}
                    className="divCenter px-4 py-2 h-full w-full text-brwn border-solid border-b-2 border-hvrBrwn shadow-none bg-white text-black hover:bg-gray-100"
                    style={{ backgroundColor: idx === isIdx ? "#f3f4f6" : "" }}
                  >
                    {isBought ? (
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
                    (isBought || idx === freeChapterIdx) ? (
                      <div>
                        <div>
                          {data.chapterDesc
                            ? data.chapterDesc
                            : "No Description Provided for this Chapter"}
                        </div>
                        <div className="w-auto flex justify-end items-end mx-4 my-4 gap-4">
                          <Button>Watch Video</Button>
                          <Button>Mark as Complete</Button>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
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
