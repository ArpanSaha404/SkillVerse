import express, { Request, Response } from "express";
import {
  checkAuth,
  login,
  logout,
  register,
  verifyAccount,
} from "../controllers/userController";

const router = express.Router();

router.post("/check-auth", checkAuth);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.patch("/verify-account", (req: Request, res: Response) => {
  verifyAccount(req, res);
});

export default router;
