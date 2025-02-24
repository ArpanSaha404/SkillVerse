export type commonProgressResType = {
  apiMsg: string;
};

export type chapterProgressType = {
  _id: string;
  chapterTitle: string;
  chapterDesc: string;
  chapterVidURL: string;
  isChapterCompleted: boolean;
};

export type courseProgressType = {
  _id: string;
  name: string;
  desc: string;
  price: number;
  freeChapterIdx: number;
  currChapterIdx: number;
  courseId: string;
  userId: string;
  creatorId: string;
  paymentMongoId: string;
  paymentId: string;
  isCourseBought: boolean;
  isCourseCreated: boolean;
  isCourseCompleted: boolean;
  chapters: chapterProgressType[];
  updatedAt?: Date;
};

export type courseProgressResType = {
  apiMsg: string;
  courseProgressInfo: courseProgressType;
};

export type chapterProgressResType = {
  apiMsg: string;
  chapterProgressInfo: chapterProgressType[];
};

export type updateChapterProgress = {
  courseProgressId: string;
  idx: number;
  status: boolean;
};

export type userCouseProgressListInputs = {
  userid: string;
  coursesBought: string[];
};

export type userCouseProgressListResponse = {
  apiMsg: string;
  userCourseProgressList: courseProgressType[];
};

export type userPurchasedCoursesDataResponse = {
  _id: string;
  name: string;
  courseId: {
    createdBy: string;
    coursePic: string;
  };
  isCourseCompleted: boolean;
  chapters: chapterProgressType[];
};

export type userPurchasedCoursesResponse = {
  apiMsg: string;
  coursesList: userPurchasedCoursesDataResponse[];
};
