import { Request, Response } from "express";
import Stripe from "stripe";
import users, { Iuser } from "../models/users";
import courses, { ICourses } from "../models/courses";
import payments, { IPayments } from "../models/payments";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const checkoutSession = async (req: Request, res: Response) => {
  try {
    const { courseId, userId } = req.body;
    const user: Iuser | null = await users.findById(userId);
    const course: ICourses | null = await courses.findById(courseId);

    if (!user || !course) {
      res.status(400).json({ apiMsg: "User or Course Not Found" });
    } else {
      const newCourseId: string = courseId.toString();
      const newUserId: string = userId.toString();
      const img: string = course.coursePic;
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "inr",
                product_data: {
                  name: course.name,
                  description: course.subTitle + " by " + course.createdBy,
                  images: [img || "https://github.com/shadcn.png"],
                },
                unit_amount: course.price * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.frontend_URL}/course-progress`,
          cancel_url: `${process.env.frontend_URL}/courses`,
          metadata: {
            newCourseId,
            newUserId,
            newCreatorId: course.creatorId.toString(),
          },
          shipping_address_collection: {
            allowed_countries: ["IN"],
          },
        } as Stripe.Checkout.SessionCreateParams);

      console.log(session);

      if (!session) {
        res.status(400).json({ apiMsg: "Some Error While Creating Session" });
      } else {
        const newPaymentEntry: IPayments = new payments({
          paymentId: session.id,
          paymentStatus: "Pending",
          courseName: course.name,
          coursePrice: course.price,
          createdBy: course.createdBy,
          courseId: course._id,
          userId: user._id,
          creatorId: course.creatorId,
        });

        await payments.create(newPaymentEntry);

        res.status(200).json({
          apiMsg: "Session Created Successfully...",
          url: session.url,
        });
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

export const webhook = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let event = req.body;
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    if (signature) {
      try {
        event = stripe.webhooks.constructEvent(
          JSON.stringify(req.body, null, 2),
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
      } catch (err: any) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return res.status(200).json({
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

  if (event.type === "checkout.session.completed") {
    if (!courseId || !userId || !creatorId) {
      return res.status(200).json({
        apiMsg: "Stripe error : Missing Metadata",
      });
    } else {
      const id = session.id;
      return res.status(200).json({
        apiMsg: "Stripe Payment Success",
        id,
        courseId,
        userId,
        creatorId,
      });
    }
  } else {
    return res.status(400).json({
      apiMsg: "Stripe error : Unhandled Event Type",
    });
  }
};
