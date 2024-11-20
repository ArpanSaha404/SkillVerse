import mongoose, { Document } from "mongoose";

export interface ICourseCategories extends Document {
  name: string;
}

const CourseCategories = new mongoose.Schema<ICourseCategories>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourseCategories>(
  "CourseCategories",
  CourseCategories
);
