import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User, { Iuser } from "../models/users";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password } = req.body;

  let { userType } = req.body;
  if (!userType) {
    userType = "Student";
  }
  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ apiMsg: "User Already Exists!!! Please Login" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser: Iuser = new User({
      fullName,
      email,
      password: hashPassword,
      userType,
      isAdmin: false,
    });
    const insertedData = await User.create(newUser);
    res.status(200).json({
      apiMsg: "Sign up Successfull",
      insertedData,
    });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      res
        .status(400)
        .json({ apiMsg: "User dosen't Exist!!! Please Sign Up First" });
    } else {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        res.status(400).json({ apiMsg: "Wrong Password!!!" });
      }
      res.status(200).json({
        apiMsg: "Login Successfull",
        user,
      });
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
