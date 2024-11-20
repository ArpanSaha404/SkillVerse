import mongoose, { Document } from "mongoose";

export type chapterType = {
  chapterTitle: string;
  chapterDesc?: string;
  chapterVid: string;
  isChapterPublished: boolean;
};

export interface ICourses extends Document {
  name: string;
  createdBy: string;
  subTitle: string;
  desc: string;
  coursePic?: string;
  categories: string;
  price: number;
  freeChapterIdx: number;
  chapters?: chapterType[];
  isPublished: boolean;
  boughtby?: mongoose.Schema.Types.ObjectId[];
}

const Courses = new mongoose.Schema<ICourses>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      ref: "User",
    },
    subTitle: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    coursePic: {
      type: String,
      default: "",
    },
    categories: {
      type: String,
      required: true,
      ref: "CourseCategories",
    },
    price: {
      type: Number,
      required: true,
    },
    freeChapterIdx: {
      type: Number,
      required: true,
      default: 0,
    },
    chapters: [
      {
        chapterTitle: {
          type: String,
          required: true,
        },
        chapterDesc: {
          type: String,
          default: "",
        },
        chapterVid: {
          type: String,
          required: true,
        },
        isChapterPublished: {
          type: Boolean,
          default: true,
        },
      },
    ],
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    boughtby: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourses>("Course", Courses);
