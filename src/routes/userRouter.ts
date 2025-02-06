import express from "express";
import {
  changePassDltAcc,
  checkAuth,
  login,
  logout,
  register,
  resetPassword,
  sendMailAgain,
  updateImage,
  updateProfileImage,
  verifyAccount,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import upload from "../utils/multer";

const router = express.Router();

router.get("/check-auth", isAuthenticated, checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.post("/sendMailAgain", sendMailAgain);
router.patch("/verify-account", verifyAccount);
router.patch("/reset-password", resetPassword);
router.put("/update-profile", isAuthenticated, changePassDltAcc);
router.patch(
  "/update-pic",
  isAuthenticated,
  upload.single("image"),
  updateProfileImage
);
router.post("/upload", isAuthenticated, upload.single("image"), updateImage);

export default router;
