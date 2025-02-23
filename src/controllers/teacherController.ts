import { Request, Response } from "express";
import courses, { ICourses } from "../models/courses";

export const checkNewCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  const courseNme = req.query.course;
  try {
    const courseInfo: ICourses | null = await courses.findOne({
      name: courseNme,
    });

    if (courseInfo) {
      res.status(400).json({
        apiMsg:
          "There is an Existing Course with this Name, Pls give a Unique Name",
      });
    } else {
      res.status(200).json({
        apiMsg: "No Course Present",
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
