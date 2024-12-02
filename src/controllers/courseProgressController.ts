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
  const { progresscode } = req.query;
  try {
    const courseProgressInfo: ICourseProgress | null = await courseProgress
      .findById(progresscode)
      .select("-createdAt -updatedAt -__v");
    if (!courseProgressInfo) {
      res.status(400).json({
        apiMsg: "No Relevant Data Found",
      });
    } else {
      if (!courseProgressInfo.isCourseBought) {
        res.status(200).json({
          apiMsg: "Course Data Fetched Successfully",
          courseProgressInfo,
        });
      } else {
        res.status(200).json({
          apiMsg:
            "Course not Bought...Data Fetched for free Chapter Successfully",
          courseProgressInfo,
        });
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const getChapterProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { progresscode } = req.query;
  try {
    const chapterProgressInfo = await courseProgress
      .findById(progresscode)
      .select("chapters -_id");
    if (!chapterProgressInfo) {
      res.status(400).json({
        apiMsg: "No Relevant Data Found",
      });
    } else {
      res.status(200).json({
        apiMsg: "Chpater Data Fetched Successfully",
        chapterProgressInfo: chapterProgressInfo.chapters,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const updateChapterProgress = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseProgressId, idx, status } = req.body;

  try {
    const courseProgressInfo: ICourseProgress | null = await courseProgress
      .findById(courseProgressId)
      .select("-createdAt -updatedAt -__v");

    if (!courseProgressInfo) {
      res.status(400).json({ apiMsg: "No Course Progress Data Found" });
    } else {
      if (status) {
        courseProgressInfo.chapters[idx].isChapterCompleted = true;
      } else {
        courseProgressInfo.chapters[idx].isChapterCompleted = false;
      }
      await courseProgressInfo.save();
      res.status(200).json({
        apiMsg: "Course Progress Updated Successfully",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const updateCourseProgressCompleted = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseProgressId, status } = req.body;

  try {
    const courseProgressInfo: ICourseProgress | null =
      await courseProgress.findById(courseProgressId);

    if (!courseProgressInfo) {
      res.status(400).json({ apiMsg: "No Course Progress Data Found" });
    } else {
      courseProgressInfo.chapters.map(
        (data) => (data.isChapterCompleted = status)
      );
      courseProgressInfo.isCourseCompletd = status;

      await courseProgressInfo.save();
      res.status(200).json({
        apiMsg: "Course Progress Updated Successfully",
        courseProgressInfo,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
