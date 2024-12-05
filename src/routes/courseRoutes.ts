import express from "express";
import {
  addCourse,
  getCreatorDetails,
  getUserPurchasedCourses,
  viewAllCourses,
  viewSingleCourse,
} from "../controllers/courseController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/course", isAuthenticated, addCourse);
router.get("/course", isAuthenticated, viewAllCourses);
router.get("/course-details/:id", isAuthenticated, viewSingleCourse);
router.get("/course-details/creator", isAuthenticated, getCreatorDetails);
router.post("/user-purchased", isAuthenticated, getUserPurchasedCourses);

export default router;
