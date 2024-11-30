import { Date } from "mongoose";

export type category = {
  _id: string;
  name: string;
};

export type categoryResponse = {
  apiMsg: string;
  categories: category[];
};
