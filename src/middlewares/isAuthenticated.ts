import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(400).json({ apiMsg: "User not Authenticated" });
    }
    const decode = jwt.verify(token, process.env.SECRECT_KEY!) as JwtPayload;

    if (!decode) {
      res.status(400).json({ apiMsg: "Invalid Token" });
    }
    req.userId = decode.userId;
    next();
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};
