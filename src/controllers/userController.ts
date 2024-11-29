import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import users, { Iuser } from "../models/users";
import { console } from "inspector";
import verifications, { IVerification } from "../models/verifications";
import { GenerateVerificationOTP } from "../utils/generateVerificationOTP";
import { GenerateToken } from "../utils/generateToken";
import {
  resetPasswordMail,
  resetPasswordSuccessMail,
  verifyAccountMail,
  welcomeMail,
} from "../utils/mailtrap,";
import {
  deleteImageFromCloudinary,
  uploadMediaToCloudinary,
} from "../utils/cloudinary";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { deleteTempFile } from "../utils/multer";

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const user: Iuser | null = await users
      .findById(userId)
      .select("-password -createdAt -updatedAt -__v");
    if (!user) {
      res.status(200).json({
        apiMsg: "User not Found",
      });
    }

    res.status(200).json({
      apiMsg: "User Found Successfully",
      user,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ apiMsg: "Passwords are Different" });
    return;
  }
  let { userType } = req.body;
  if (!userType) {
    userType = "Student";
  }
  try {
    const userExists = await users.findOne({ email });

    if (userExists) {
      res.status(400).json({ apiMsg: "User Already Exists!!! Please Login" });
      return;
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser: Iuser = new users({
      fullName,
      email,
      password: hashPassword,
      userType,
      isVerified: false,
      isAdmin: false,
    });

    const verificationOTP = GenerateVerificationOTP();
    const newVerification: IVerification = new verifications({
      email: email,
      verificationTypes: "verifyAccount",
      verificationCode: verificationOTP,
      verificationExiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await verifyAccountMail(email, verificationOTP);

    await users.create(newUser);
    await verifications.create(newVerification);

    res.status(200).json({
      apiMsg: "Sign up Successfull...Please Verify your Account",
      email,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  console.log("Hello Login");
  const { email, password } = req.body;
  try {
    const user: Iuser | null = await users
      .findOne({ email })
      .select("-createdAt -updatedAt -__v");

    if (!user || !user.password) {
      res
        .status(400)
        .json({ apiMsg: "User dosen't Exist!!! Please Sign Up First" });
    } else {
      if (!user.isVerified) {
        res.status(400).json({
          apiMsg: "User not Verified...Pls Verify your Account First",
        });
      } else {
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          res.status(400).json({ apiMsg: "Wrong Password!!!" });
        } else {
          GenerateToken(res, user);
          user.password = "";
          res.status(200).json({
            apiMsg: "Logged in Successfully",
            user,
          });
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const logout = (_: Request, res: Response) => {
  try {
    res.clearCookie("token").status(200).json({
      apiMsg: "Logged Out",
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const sendMailAgain = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, mailType } = req.body;
  try {
    const verifyDetails: IVerification | null = await verifications.findOne({
      email,
    });

    if (mailType === "verifyAccount") {
      if (!verifyDetails) {
        res
          .status(400)
          .json({ apiMsg: "User dosen't Exist!!! Please Sign Up First" });
      } else {
        if (verifyDetails.verificationTypes === "verifyAccount") {
          const verificationOTP = GenerateVerificationOTP();
          verifyDetails.verificationCode = verificationOTP;
          verifyDetails.verificationExiresAt = new Date(
            Date.now() + 24 * 60 * 60 * 1000
          );

          await verifyAccountMail(email, verificationOTP);
          await verifyDetails.save();
          res.status(200).json({
            apiMsg: "OTP Sent again...Your OTP will be valid for 1D!!!",
          });
        } else {
          res
            .status(400)
            .json({ apiMsg: "Some Error!!! Pls Contact Our Team" });
        }
      }
    } else if (mailType === "resetPassword") {
      if (!verifyDetails) {
        const verificationOTP = GenerateVerificationOTP();
        const newVerification: IVerification = new verifications({
          email: email,
          verificationTypes: "resetPassword",
          verificationCode: verificationOTP,
          verificationExiresAt: Date.now() + 24 * 60 * 60 * 1000,
        });

        await resetPasswordMail(email, verificationOTP);
        await verifications.create(newVerification);

        res.status(200).json({
          apiMsg: "OTP Sent to your Mail...",
          email,
        });
      } else {
        if (verifyDetails.verificationTypes === "resetPassword") {
          const verificationOTP = GenerateVerificationOTP();
          verifyDetails.verificationCode = verificationOTP;
          verifyDetails.verificationExiresAt = new Date(
            Date.now() + 24 * 60 * 60 * 1000
          );

          await resetPasswordMail(email, verificationOTP);
          await verifyDetails.save();
          res.status(200).json({
            apiMsg: "OTP Sent again...Your OTP will be valid for 1D!!!",
          });
        } else {
          res
            .status(400)
            .json({ apiMsg: "Some Error!!! Pls Contact Our Team" });
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const verifyAccount = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, otp } = req.body;

  try {
    const verifyUser: IVerification | null = await verifications.findOne({
      email,
    });
    const userDetails: Iuser | null = await users
      .findOne({ email })
      .select("-password -createdAt -updatedAt -__v");

    if (!userDetails) {
      res
        .status(400)
        .json({ apiMsg: "User not Found...Please Sign up first!!!" });
    }

    if (!verifyUser) {
      res.status(400).json({ apiMsg: "OTP Expired!!!" });
    }

    if (userDetails?.isVerified) {
      res
        .status(400)
        .json({ apiMsg: "User already Verified...Please Log in!!!" });
    }

    if (verifyUser?.verificationTypes !== "verifyAccount") {
      res.status(400).json({ apiMsg: "Wrong Verifcation..." });
    }

    if (verifyUser) {
      if (new Date() > verifyUser.verificationExiresAt) {
        res.status(400).json({ apiMsg: "OTP Expired!!!" });
      }

      if (otp !== verifyUser.verificationCode) {
        res.status(400).json({ apiMsg: "Entered OTP is wrong!!!" });
      }
    }
    await verifications.findOneAndDelete({ email });
    if (userDetails) {
      userDetails.isVerified = true;
      await userDetails.save();

      await welcomeMail(email, userDetails.fullName);

      GenerateToken(res, userDetails);
    }

    res.status(200).json({
      apiMsg: "Verified Successfully",
      userDetails,
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, otp, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ apiMsg: "Passwords are Different" });
    return;
  }
  try {
    const resetPassDetails: IVerification | null = await verifications.findOne({
      email,
    });
    const userDetails: Iuser | null = await users
      .findOne({ email })
      .select("-password -createdAt -updatedAt -__v");

    if (!userDetails) {
      res
        .status(400)
        .json({ apiMsg: "User not Found...Please Sign up first!!!" });
    }

    if (!resetPassDetails) {
      res.status(400).json({ apiMsg: "OTP Expired!!!" });
    }

    if (!userDetails?.isVerified) {
      res
        .status(400)
        .json({ apiMsg: "User not yet Verified...Pls Verify First!!!" });
    }

    if (resetPassDetails?.verificationTypes !== "resetPassword") {
      res.status(400).json({ apiMsg: "Wrong Verifcation..." });
    }

    if (resetPassDetails) {
      if (new Date() > resetPassDetails.verificationExiresAt) {
        res.status(400).json({ apiMsg: "OTP Expired!!!" });
      }

      if (otp !== resetPassDetails.verificationCode) {
        res.status(400).json({ apiMsg: "Entered OTP is wrong!!!" });
      }
    }
    await verifications.findOneAndDelete({ email });
    if (userDetails) {
      const hashPassword = await bcrypt.hash(password, 10);
      userDetails.password = hashPassword;
      await userDetails.save();

      await resetPasswordSuccessMail(email);
    }

    res.status(200).json({
      apiMsg: "Password Reset Successfully",
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const updateImage = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;

  try {
    if (file && file.path) {
      // Cloudinary Actions
      const url: UploadApiResponse | undefined = await uploadMediaToCloudinary(
        file.path
      );
      await deleteImageFromCloudinary("b7vz91ervfayinmad1ui");
      deleteTempFile(file.path);
      res.status(200).json({ apiMsg: "Hello" });
    }
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
