import express from "express";
import {
  addCourse,
  viewAllCourses,
  viewSingleCourse,
} from "../controllers/courseController";

const router = express.Router();

router.post("/course", addCourse);
router.get("/course", viewAllCourses);
router.get("/singlecourse/:id", viewSingleCourse);

export default router;
