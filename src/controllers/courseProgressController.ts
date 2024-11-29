import { Request, Response } from "express";
import courseProgress, { ICourseProgress } from "../models/courseProgress";

export const addCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newCourseProgressc: ICourseProgress = new courseProgress(req.body);
    const insertedData = await courseProgress.create(newCourseProgressc);
    res.status(200).json({
      apiMsg: "Course Progress Created Successfully",
      insertedData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const getCourseProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseId, userID, vidUrl } = req.query;
  try {
    const progressData: ICourseProgress | null = await courseProgress.findOne({
      courseId: courseId,
      userId: userID,
    });

    if (!progressData) {
      res.status(400).json({
        apiMsg: "No Relevant Data Found",
      });
    } else {
      let vidIdx, videoLink;
      if (!progressData.isCourseBought) {
        vidIdx = 0;
        videoLink =
          progressData.chapters[progressData.freeChapterIdx].chapterVidURL;

        res.status(200).json({
          apiMsg: "Course Progress Data Fetched Successfully",
          vidIdx,
          vidUrl,
          progressData,
        });
      } else {
        // const matchedVid = progressData.chapters.filter((url) => url.chapterVidURL === vidUrl);
        vidIdx = progressData.chapters.findIndex(
          (url) => url.chapterVidURL === vidUrl
        );
        videoLink =
          vidIdx !== -1 ? progressData.chapters[vidIdx].chapterVidURL : "";
        if (vidIdx && videoLink) {
          res.status(200).json({
            apiMsg: "Course Progress Data Fetched Successfully",
            vidIdx,
            videoLink,
            progressData,
          });
        } else {
          res.status(200).json({
            apiMsg:
              "Course Progress Data Fetched Successfully...Video URL is not Valid...Fetching Free Video",
            vidIdx: progressData.freeChapterIdx,
            videoLink:
              progressData.chapters[progressData.freeChapterIdx].chapterVidURL,
            progressData,
          });
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
