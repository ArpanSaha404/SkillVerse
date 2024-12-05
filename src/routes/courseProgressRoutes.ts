import express from "express";
import {
  addCourseProgress,
  getCourseProgress,
  updateChangeVideoIdx,
  updateChapterProgress,
  updateCourseProgressCompleted,
  updateProgressVideo,
} from "../controllers/courseProgressController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/course-progress", isAuthenticated, addCourseProgress);
router.get("/course-progress", isAuthenticated, getCourseProgress);
router.patch("/chapter-update", isAuthenticated, updateChapterProgress);
router.patch("/course-update", isAuthenticated, updateCourseProgressCompleted);
router.patch("/progress-update", isAuthenticated, updateProgressVideo);
router.patch("/currvideo-update", isAuthenticated, updateChangeVideoIdx);

export default router;
