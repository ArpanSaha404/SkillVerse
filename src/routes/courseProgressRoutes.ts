import express from "express";
import {
  addCourseProgress,
  getCourseProgress,
} from "../controllers/courseProgressController";

const router = express.Router();

router.post("/course-progress", addCourseProgress);
router.get("/course-progress", getCourseProgress);

export default router;
