import { Request, Response } from "express";
import courseProgress, { ICourseProgress } from "../models/courseProgress";
import mongoose from "mongoose";

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

      const isCourseCompleted: boolean =
        courseProgressInfo.isCourseCompleted ||
        courseProgressInfo.chapters
          .map((data) => data.isChapterCompleted)
          .every((value) => value === true);

      const msg: string = isCourseCompleted
        ? "Congrats...You've Completed this Course!!!"
        : "Course Progress Updated";

      await courseProgressInfo.save();

      res.status(200).json({
        apiMsg: msg,
        courseProgressInfo,
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
    const courseProgressInfo: ICourseProgress | null = await courseProgress
      .findById(courseProgressId)
      .select("-createdAt -updatedAt -__v");

    if (!courseProgressInfo) {
      res.status(400).json({ apiMsg: "No Course Progress Data Found" });
    } else {
      courseProgressInfo.chapters.map(
        (data) => (data.isChapterCompleted = status)
      );
      courseProgressInfo.isCourseCompleted = status;

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

export const updateProgressVideo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseProgressId, idx, isCourseCompleted } = req.body;
  try {
    const courseProgressInfo: ICourseProgress | null = await courseProgress
      .findById(courseProgressId)
      .select("-createdAt -updatedAt -__v");
    if (!courseProgressInfo) {
      res.status(400).json({ apiMsg: "No Course Progress Data Found" });
    } else {
      if (isCourseCompleted) {
        courseProgressInfo.chapters.map(
          (data) => (data.isChapterCompleted = true)
        );
        courseProgressInfo.isCourseCompleted = true;
        courseProgressInfo.currChapterIdx = 0;
      } else {
        courseProgressInfo.chapters[idx].isChapterCompleted = true;
        if (idx === courseProgressInfo.chapters.length - 1) {
          courseProgressInfo.currChapterIdx = 0;
        } else {
          courseProgressInfo.currChapterIdx += 1;
        }
      }

      const msg = isCourseCompleted
        ? "Congrats...You've Completed this Course!!!"
        : "Course Progress Updated";

      await courseProgressInfo.save();

      res.status(200).json({
        apiMsg: msg,
        courseProgressInfo,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const updateChangeVideoIdx = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { courseProgressId, idx } = req.body;
  try {
    const courseProgressInfo: ICourseProgress | null = await courseProgress
      .findById(courseProgressId)
      .select("-createdAt -updatedAt -__v");
    if (!courseProgressInfo) {
      res.status(400).json({ apiMsg: "No Course Progress Data Found" });
    } else {
      courseProgressInfo.currChapterIdx = idx;

      await courseProgressInfo.save();

      res.status(200).json({
        apiMsg: "Current Video Idx upated Successfully",
        courseProgressInfo,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const purchasedCoursesbyUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = new mongoose.Types.ObjectId(req.query.userId as string);

  try {
    const coursesList: ICourseProgress[] | null = await courseProgress
      .find({ userId: userId, isCourseBought: true })
      .select("_id name isCourseCompleted chapters")
      .populate("courseId", "-_id createdBy coursePic");
    if (!coursesList) {
      res.status(200).json({ apiMsg: "No Course Purchased" });
    } else {
      res.status(200).json({
        apiMsg: "Purchased Courses Data Fetched Successfully",
        coursesList,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
