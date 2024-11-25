import express, { Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import categoryRoutes from "./routes/CategoriesRoutes";
import courseRoutes from "./routes/courseRoutes";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

const _dirName = path.resolve();

app.use("/api/users", userRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/course", courseRoutes);

// Delete Later
app.get("/test", (_, res: Response) => {
  console.log("Hello");
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
