import { Date } from "mongoose";

export type chapterType = {
  chapterTitle: string;
  chapterDesc?: string;
  chapterVid: string;
  isChapterPublished: boolean;
};

export type courseType = {
  _id: string;
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
  boughtby?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
