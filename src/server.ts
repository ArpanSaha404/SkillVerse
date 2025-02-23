import express, { Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import courseRoutes from "./routes/courseRoutes";
import courseProgressRoutes from "./routes/courseProgressRoutes";
import categoriesRoutes from "./routes/categoriesRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import teacherRoutes from "./routes/teacherRoutes";
import path from "path";
import fs from "fs";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.frontend_URL,
    credentials: true,
  })
);

export const _dirName = path.resolve();
const uploadDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/api/users", userRouter);
app.use("/api/course", courseRoutes);
app.use("/api/category", categoriesRoutes);
app.use("/api/course-progress", courseProgressRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/teacher", teacherRoutes);

// Delete Later
app.get("/test", (_, res: Response) => {
  res.send("Server Started!!! This is a Test Link...");
});

app.use(express.static(path.join(_dirName, "/frontend/build")));
app.use("*", (_, res: Response) => {
  res.sendFile(path.resolve(_dirName, "frontend", "build", "index.html"));
});

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on PORT : ${PORT}`);
    });
    console.log("Connected to Mongo DB");
  })
  .catch((err) => {
    console.error(err);
  });
