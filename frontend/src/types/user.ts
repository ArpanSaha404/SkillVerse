import { string } from "zod";

export type registerUserType = {
  apiMsg: string;
};

export type loginUserType = {
  apiMsg: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    password: string;
    pic: string;
    userType: string;
    isAdmin: boolean;
    isVerified: boolean;
  };
};

export type logoutUserType = {
  apiMsg: string;
};
