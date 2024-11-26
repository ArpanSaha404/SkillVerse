import express, { Request, Response } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  resetPassword,
  sendMailAgain,
  verifyAccount,
} from "../controllers/userController";

const router = express.Router();

router.post("/check-auth", checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/sendMailAgain", sendMailAgain);
router.patch("/verify-account", verifyAccount);
router.patch("/reset-password", resetPassword);

export default router;
