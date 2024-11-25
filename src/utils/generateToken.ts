import { Response } from "express";
import { Iuser } from "../models/users";
import jwt from "jsonwebtoken";

export const GenerateToken = (res: Response, user: Iuser): string => {
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRECT_KEY!,
    { expiresIn: "30d" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};
