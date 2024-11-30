import { Request, Response } from "express";
import { console } from "inspector";
import Course, { ICourses } from "../models/courses";
import users, { Iuser } from "../models/users";

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
    const courseData: ICourses[] | null = await Course.find({
      isPublished: true,
    })
      .select("-createdAt -updatedAt -__v")
      .sort({
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
    if (!courseData) {
      res.status(400).json({ apiMsg: "No Relevant Course Data" });
    } else {
      res.status(200).json({
        apiMsg: "Course Fetched Successfully",
        courseData,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const getCreatorDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { creatorId } = req.query;
  try {
    const user: Iuser | null = await users.findById(creatorId);
    if (!user) {
      res.status(400).json({ apiMsg: "Creator ID is Invalid" });
    } else {
      res.status(200).json({
        apiMsg: "Creator Details Fetched Successfully...",
        fullName: user.fullName,
        image: user.pic,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
