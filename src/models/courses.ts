import mongoose, { Document } from "mongoose";

export type chapterType = {
  chapterTitle: string;
  chapterDesc: string;
  chapterVidURL: string;
  chapterPublicId: string;
  isChapterPublished: boolean;
};

export interface ICourses extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  createdBy: string;
  creatorId: mongoose.Schema.Types.ObjectId;
  subTitle: string;
  desc: string;
  coursePic: string;
  categories: string;
  price: number;
  freeChapterIdx: number;
  chapters: chapterType[];
  isPublished: boolean;
  boughtby: mongoose.Schema.Types.ObjectId[];
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
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
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
        chapterVidURL: {
          type: String,
          required: true,
        },
        chapterPublicId: {
          type: String,
          required: true,
        },
        isChapterPublished: {
          type: Boolean,
          default: true,
        },
        default: [],
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
        ref: "User",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourses>("Course", Courses);
