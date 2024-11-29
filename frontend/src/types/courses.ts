export type chapterType = {
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

export type allCoursesType = {
  apiMsg: string;
  courseData: courseType[];
};

export type singleCoursesType = {
  apiMsg: string;
  courseData: courseType;
};
