import express from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  resetPassword,
  sendMailAgain,
  updateImage,
  verifyAccount,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../utils/multer";

const router = express.Router();

router.get("/check-auth", isAuthenticated, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/sendMailAgain", sendMailAgain);
router.patch("/verify-account", verifyAccount);
router.patch("/reset-password", resetPassword);
router.post("/upload", upload.single("image"), updateImage);

export default router;
