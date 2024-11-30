import mongoose, { Document } from "mongoose";

export type chapterProgress = {
  chapterTitle: string;
  chapterDesc: string;
  chapterVidURL: string;
  isChapterCompleted: boolean;
};

export interface ICourseProgress extends Document {
  name: string;
  desc: string;
  price: number;
  freeChapterIdx: number;
  currChapterIdx: number;
  courseId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  creatorId: mongoose.Schema.Types.ObjectId;
  isCourseBought: boolean;
  isCourseCreated: boolean;
  isCourseCompletd: boolean;
  chapters: chapterProgress[];
}

const CourseProgress = new mongoose.Schema<ICourseProgress>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      ref: "Course",
    },
    desc: {
      type: String,
      required: true,
      ref: "Course",
    },
    price: {
      type: Number,
      required: true,
      ref: "Course",
    },
    freeChapterIdx: {
      type: Number,
      required: true,
      default: 0,
      ref: "Course",
    },
    currChapterIdx: {
      type: Number,
      default: 0,
      ref: "Course",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isCourseBought: {
      type: Boolean,
      default: false,
    },
    isCourseCreated: {
      type: Boolean,
      default: false,
    },

    chapters: [
      {
        chapterTitle: {
          type: String,
          required: true,
          ref: "Course",
        },
        chapterDesc: {
          type: String,
          default: "",
          ref: "Course",
        },
        chapterVidURL: {
          type: String,
          required: true,
          ref: "Course",
        },
        isChapterCompleted: {
          type: Boolean,
          default: false,
        },
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICourseProgress>(
  "CourseProgress",
  CourseProgress
);