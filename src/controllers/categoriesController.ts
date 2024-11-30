import { Request, Response } from "express";
import { console } from "inspector";
import courseCategories, {
  ICourseCategories,
} from "../models/courseCategories";

export const addCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name } = req.body;
  try {
    const newCategory: ICourseCategories = new courseCategories({ name });
    const insertedData = await courseCategories.create(newCategory);
    res.status(200).json({
      apiMsg: "Course Category Created Successfully",
      insertedData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const viewallCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await courseCategories
      .find()
      .select("-createdAt -updatedAt -__v");
    res.status(200).json({
      apiMsg: "Course Category Fteched Successfully",
      categories,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
