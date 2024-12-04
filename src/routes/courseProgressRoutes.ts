import express from "express";
import {
  addCourseProgress,
  getCourseProgress,
  updateChangeVideoIdx,
  updateChapterProgress,
  updateCourseProgressCompleted,
  updateProgressVideo,
} from "../controllers/courseProgressController";

const router = express.Router();

router.post("/course-progress", addCourseProgress);
router.get("/course-progress", getCourseProgress);
router.patch("/chapter-update", updateChapterProgress);
router.patch("/course-update", updateCourseProgressCompleted);
router.patch("/progress-update", updateProgressVideo);
router.patch("/currvideo-update", updateChangeVideoIdx);

export default router;
