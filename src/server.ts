import express, { Application, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRouter";
import path from "path";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

const _dirName = path.resolve();

app.use("/api/users", userRoutes);

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
