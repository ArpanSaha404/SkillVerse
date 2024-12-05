import express from "express";
import {
  addCategory,
  viewallCategory,
} from "../controllers/categoriesController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/category", isAuthenticated, addCategory);
router.get("/category", isAuthenticated, viewallCategory);

export default router;
