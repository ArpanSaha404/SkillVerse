import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRouter";

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);

// Delete Later
app.get("/test", (req: Request, res: Response) => {
  res.send("Server Started!!! This is a Test Link...");
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
