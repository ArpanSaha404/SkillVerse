export type chapterType = {
  _id: string;
  chapterTitle: string;
  chapterDesc: string;
  chapterVidURL: string;
  chapterPublicId: string;
  isChapterPublished: boolean;
};

export type courseType = {
  _id: string;
  name: string;
  createdBy: string;
  creatorId: string;
  subTitle: string;
  desc: string;
  coursePic: string;
  categories: string;
  price: number;
  freeChapterIdx: number;
  chapters: chapterType[];
  isPublished: boolean;
  boughtby: string[];
};

export type creatorPic = {
  apiMsg: string;
  fullName: string;
  image: string;
};

export type allCoursesType = {
  apiMsg: string;
  courseData: courseType[];
};

export type singleCoursesType = {
  apiMsg: string;
  courseData: courseType;
};
