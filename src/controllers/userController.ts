import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import users, { Iuser } from "../models/users";
import { console } from "inspector";
import verifications, { IVerification } from "../models/verifications";
import { GenerateVerificationOTP } from "../utils/generateVerificationOTP";
import { GenerateToken } from "../utils/generateToken";
import { verifyAccountMail, welcomeMail } from "../utils/mailtrap,";

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const user: Iuser | null = await users.findById(userId).select("-password");
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

    const verificationOTP = GenerateVerificationOTP(); //make
    const newVerification: IVerification = new verifications({
      email: email,
      verificationTypes: "verifyAccount",
      verificationCode: verificationOTP,
      verificationExiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await verifyAccountMail(email, verificationOTP);

    const insertedData = await users.create(newUser);
    await verifications.create(newVerification);

    GenerateToken(res, insertedData);

    res.status(200).json({
      apiMsg: "Sign up Successfull...Please Verify your Account",
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
      return;
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ apiMsg: "Wrong Password!!!" });
        return;
      }
      GenerateToken(res, user);
      user.password = "";
      res.status(200).json({
        apiMsg: "Logged in Successfully",
        user,
      });
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
