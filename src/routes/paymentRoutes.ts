import express, { Request, Response } from "express";
import { checkoutSession, webhook } from "../controllers/paymentController";

const router = express.Router();

router.post("/payment", checkoutSession);
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req: Request, res: Response) => {
    webhook(req, res);
  }
);

export default router;
