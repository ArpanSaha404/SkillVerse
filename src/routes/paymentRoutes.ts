import express, { Request, Response } from "express";
import { checkoutSession } from "../controllers/paymentController";
import Stripe from "stripe";
import payments, { IPayments } from "../models/payments";
import users, { Iuser } from "../models/users";
import courses, { ICourses } from "../models/courses";
import courseProgress, { ICourseProgress } from "../models/courseProgress";
import { coursePurchasedMail } from "../utils/mailtrap,";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

router.post("/payment", isAuthenticated, checkoutSession);
router.post(
  "/webhook",
  isAuthenticated,
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response): Promise<void> => {
    let event = req.body;

    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (secret) {
      // Get the signature sent by Stripe
      const payloadString = JSON.stringify(req.body, null, 2);
      const header = stripe.webhooks.generateTestHeaderString({
        payload: payloadString,
        secret,
      });

      const signature = req.headers["stripe-signature"] as string;
      if (signature) {
        try {
          event = stripe.webhooks.constructEvent(payloadString, header, secret);
        } catch (err: any) {
          console.log(
            `⚠️  Webhook signature verification failed.`,
            err.message
          );
          res.status(200).json({
            apiMsg: "Stripe Webhook Construct Event Error",
            errorMsg: err.message,
          });
        }
      }
    }

    const session = event.data.object as Stripe.Checkout.Session;
    const courseId = session?.metadata?.newCourseId;
    const userId = session?.metadata?.newUserId;
    const creatorId = session?.metadata?.newCreatorId;
    const newPaymentId = session?.metadata?.newPaymentId;
    const newCourseProgressId = session?.metadata?.newCourseProgressId;

    if (!newPaymentId) {
      res.status(200).json({
        apiMsg: "Stripe error : Missing Metadata : Payment Id",
      });
    } else {
      const paymentInfo: IPayments | null = await payments.findById(
        newPaymentId
      );
      if (!paymentInfo) {
        res.status(200).json({
          apiMsg: "Inalid Payment Id",
        });
      } else {
        if (event.type === "checkout.session.completed") {
          if (!courseId || !userId || !creatorId) {
            res.status(200).json({
              apiMsg: "Stripe error : Missing Metadata",
            });
          } else {
            const userInfo: Iuser | null = await users.findById(userId);
            const courseInfo: ICourses | null = await courses.findById(
              courseId
            );
            const courseProgressInfo: ICourseProgress | null =
              await courseProgress.findById(newCourseProgressId);

            if (!userInfo || !courseInfo || !courseProgressInfo) {
              if (!userInfo) {
                res.status(200).json({
                  apiMsg: "Invalid User Details",
                });
              } else if (!courseInfo) {
                res.status(200).json({
                  apiMsg: "Invalid Course Details",
                });
              } else if (!courseProgressInfo) {
                res.status(200).json({
                  apiMsg: "Course Progress Info not Found",
                });
              }
            } else {
              courseProgressInfo.paymentId = newPaymentId;
              courseProgressInfo.currChapterIdx = 0;
              courseProgressInfo.isCourseBought = true;

              courseInfo.boughtby.push(userInfo._id);
              userInfo.coursesBought.push(courseInfo._id);

              await courseProgressInfo.save();
              await courseInfo.save();
              await userInfo.save();

              paymentInfo.paymentStatus = "Success";
              await paymentInfo.save();

              await coursePurchasedMail(
                userInfo.email,
                userInfo.fullName,
                courseProgressInfo.name,
                courseProgressInfo.price.toString(),
                courseProgressInfo.paymentId,
                `${process.env.FRONTEND_URL}/course-progress?progresscode=${courseProgressInfo._id}`
              );

              res.status(200).json({
                apiMsg: "Stripe Payment Success",
              });
            }
          }
        } else {
          paymentInfo.paymentStatus = "Failed";
          await paymentInfo.save();

          res.status(400).json({
            apiMsg: "Stripe error : Unhandled Event Type",
          });
        }
      }
    }
  }
);

export default router;
