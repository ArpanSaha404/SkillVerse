import { Request, Response } from "express";
import { console } from "inspector";
import Course, { ICourses } from "../models/courses";

export const addCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const newCourse: ICourses = new Course(req.body);
    const insertedData = await Course.create(newCourse);
    res.status(200).json({
      apiMsg: "Course Created Successfully",
      insertedData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const viewAllCourses = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("hello");
    const courseData: ICourses[] | null = await Course.find().sort({
      price: 1,
    });
    res.status(200).json({
      apiMsg: "Course Fetched Successfully",
      courseData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const viewSingleCourse = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const courseData: ICourses | null = await Course.findById(id);
    console.log("Hello");
    res.status(200).json({
      apiMsg: "Course Fetched Successfully",
      courseData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
