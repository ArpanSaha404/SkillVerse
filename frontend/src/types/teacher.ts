export type createNewChapterType = {
  id: number;
  chapterTitle: string;
  chapterDesc: string;
  chapterVidURL: string;
  isChapterPublished: boolean;
};

export type createNewCourseType = {
  name: string;
  createdBy: string;
  creatorId: string;
  subTitle: string;
  desc: string;
  price: number;
  chapters: createNewChapterType[];
};

export type courseEditStatusType = {
  name: boolean;
  subTitle: boolean;
  desc: boolean;
  price: boolean;
};

export type chapterEditStatusType = {
  id: boolean;
  chapterTitle: boolean;
  chapterDesc: boolean;
  chapterVidURL: boolean;
  isChapterPublished: boolean;
};
