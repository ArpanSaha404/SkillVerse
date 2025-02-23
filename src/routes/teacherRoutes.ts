import express from "express";
import { checkNewCourse } from "../controllers/teacherController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.get("/check-course", checkNewCourse);

export default router;
