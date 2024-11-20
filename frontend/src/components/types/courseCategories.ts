import { Date } from "mongoose";

export type category = {
  _id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};
