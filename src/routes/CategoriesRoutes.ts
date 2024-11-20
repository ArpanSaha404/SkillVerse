import express from "express";
import {
  addCategory,
  viewallCategory,
} from "../controllers/categoriesController";

const router = express.Router();

router.post("/category", addCategory);
router.get("/category", viewallCategory);

export default router;
