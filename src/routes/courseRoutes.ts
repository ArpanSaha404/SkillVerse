import express from "express";
import {
  addCourse,
  viewAllCourses,
  viewSingleCourse,
} from "../controllers/courseController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/course", addCourse);
router.get("/course", viewAllCourses);
router.get("/singlecourse/:id", isAuthenticated, viewSingleCourse);

export default router;
