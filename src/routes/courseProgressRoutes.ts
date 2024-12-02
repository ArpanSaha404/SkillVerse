import express from "express";
import {
  addCourseProgress,
  getChapterProgress,
  getCourseProgress,
  updateChapterProgress,
  updateCourseProgressCompleted,
} from "../controllers/courseProgressController";

const router = express.Router();

router.post("/course-progress", addCourseProgress);
router.get("/course-progress", getCourseProgress);
router.get("/chapter-progress", getChapterProgress);
router.patch("/chapter-update", updateChapterProgress);
router.patch("/course-update", updateCourseProgressCompleted);

export default router;
