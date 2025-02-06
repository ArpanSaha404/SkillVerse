export type responseType = {
  apiMsg: string;
};

export type registerUserType = {
  apiMsg: string;
  email: string;
};

export type loginUserType = {
  apiMsg: string;
  user?: {
    _id: string;
    fullName: string;
    email: string;
    password?: string;
    pic: string;
    userType: string;
    isVerified: boolean;
    isAdmin: boolean;
    coursesBought: string[];
    coursesCreated: string[];
    updatedAt?: Date;
  };
  error?: any;
};

export type sendMailType = {
  email: string;
  mailType: string;
};

export type verifyAccountInputType = {
  email: string;
  otp: string;
};

export type changePassDltAccType = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  text: string;
  email: string;
  type: string;
};

export type updateProfilePicType = {
  apiMsg: string;
  pic?: string;
};
