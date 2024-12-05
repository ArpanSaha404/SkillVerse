import { Request, Response } from "express";
import Stripe from "stripe";
import users, { Iuser } from "../models/users";
import courses, { ICourses } from "../models/courses";
import payments, { IPayments } from "../models/payments";
import { GenerateVerificationOTP } from "../utils/generateVerificationOTP";
import courseProgress, {
  chapterProgressType,
  ICourseProgress,
} from "../models/courseProgress";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export const checkoutSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, userId } = req.body;
    const userInfo: Iuser | null = await users.findById(userId);
    const courseInfo: ICourses | null = await courses.findById(courseId);

    if (!userInfo || !courseInfo) {
      if (!userInfo) {
        res.status(200).json({
          apiMsg: "Invalid User Details",
        });
      } else {
        res.status(200).json({
          apiMsg: "Invalid Course Details",
        });
      }
    } else {
      if (
        userInfo.coursesBought.filter((data) => data === courseInfo._id)
          .length >= 1
      ) {
        res.status(200).json({
          apiMsg: "Course Already Purchased",
        });
      } else {
        const newPaymentEntry: IPayments = new payments({
          paymentId: GenerateVerificationOTP(),
          paymentStatus: "Pending",
          courseName: courseInfo.name,
          coursePrice: courseInfo.price,
          createdBy: courseInfo.createdBy,
          courseId: courseInfo._id,
          userId: userInfo._id,
          creatorId: courseInfo.creatorId,
        });

        const newPayment = await payments.create(newPaymentEntry);

        const allChaptersInfo: chapterProgressType[] = courseInfo.chapters.map(
          (data) => ({
            chapterTitle: data.chapterTitle,
            chapterDesc: data.chapterDesc,
            chapterVidURL: data.chapterVidURL,
            isChapterCompleted: false,
          })
        );

        const newCourseProgressInfo: ICourseProgress = new courseProgress({
          name: courseInfo.name,
          desc: courseInfo.desc,
          price: courseInfo.price,
          freeChapterIdx: courseInfo.freeChapterIdx,
          currChapterIdx: courseInfo.freeChapterIdx,
          courseId: courseInfo._id,
          userId: userInfo._id,
          creatorId: courseInfo.creatorId,
          paymentMongoId: newPayment._id,
          paymentId: newPayment.paymentId,
          isCourseBought: false,
          isCourseCompletd: false,
          chapters: allChaptersInfo,
        });

        const newCourseProgress: ICourseProgress = await courseProgress.create(
          newCourseProgressInfo
        );

        const newCourseId: string = courseId.toString();
        const newUserId: string = userId.toString();
        const newPaymentId: string = newPayment._id.toString();
        const newCourseProgressId: string = newCourseProgress._id.toString();
        const img: string = courseInfo.coursePic;

        const session: Stripe.Checkout.Session =
          await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
              {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: courseInfo.name,
                    description:
                      courseInfo.subTitle + " by " + courseInfo.createdBy,
                    images: [img || "https://github.com/shadcn.png"],
                  },
                  unit_amount: courseInfo.price * 100,
                },
                quantity: 1,
              },
            ],
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL}/course-progress?progresscode=${newCourseProgress._id}`,
            cancel_url: `${process.env.FRONTEND_URL}/courses`,
            metadata: {
              newCourseId,
              newUserId,
              newCreatorId: courseInfo.creatorId.toString(),
              newPaymentId,
              newCourseProgressId,
            },
            shipping_address_collection: {
              allowed_countries: ["IN"],
            },
          } as Stripe.Checkout.SessionCreateParams);

        if (!session) {
          res.status(400).json({ apiMsg: "Some Error While Creating Session" });
        } else {
          newPayment.paymentId = session.id;
          await newPayment.save();

          res.status(200).json({
            apiMsg:
              "Please Wait you'll be redirected to Payment Page Shortly...",
            apiMsg2: "Session Created Successfully...",
            url: session.url,
          });
        }
      }
    }
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ apiMsg: "Some Error", errorMsg: error.message });
  }
};

// export const webhook = async (
//   req: Request,
//   res: Response
// ): Promise<Response> => {
//   let event = req.body;
//   const secret = process.env.STRIPE_WEBHOOK_SECRET;
//   if (secret) {
//     // Get the signature sent by Stripe
//     const signature = req.headers["stripe-signature"] as string;
//     const payloadString = JSON.stringify(req.body, null, 2);
//     const header = stripe.webhooks.generateTestHeaderString({
//       payload: payloadString,
//       secret,
//     });

//     if (signature) {
//       try {
//         event = stripe.webhooks.constructEvent(
//           JSON.stringify(req.body, null, 2),
//           header,
//           secret
//         );
//       } catch (err: any) {
//         console.log(`⚠️  Webhook signature verification failed.`, err.message);
//         return res.status(200).json({
//           apiMsg: "Stripe Webhook Construct Event Error",
//           errorMsg: err.message,
//         });
//       }
//     }
//   }

//   const session = event.data.object as Stripe.Checkout.Session;
//   const courseId = session?.metadata?.newCourseId;
//   const userId = session?.metadata?.newUserId;
//   const creatorId = session?.metadata?.newCreatorId;
//   const newPaymentId = session?.metadata?.newPaymentId;
//   const newCourseProgressId = session?.metadata?.newCourseProgressId;

//   if (!newPaymentId) {
//     return res.status(200).json({
//       apiMsg: "Stripe error : Missing Metadata : Payment Id",
//     });
//   } else {
//     const paymentInfo: IPayments | null = await payments.findById(newPaymentId);
//     if (!paymentInfo) {
//       return res.status(200).json({
//         apiMsg: "Inalid Payment Id",
//       });
//     } else {
//       if (event.type === "checkout.session.completed") {
//         if (!courseId || !userId || !creatorId) {
//           return res.status(200).json({
//             apiMsg: "Stripe error : Missing Metadata",
//           });
//         } else {
//           const userInfo: Iuser | null = await users.findById(userId);
//           const courseInfo: ICourses | null = await courses.findById(courseId);
//           const courseProgressInfo: ICourseProgress | null =
//             await courseProgress.findById(newCourseProgressId);

//           if (!userInfo || !courseInfo || !courseProgressInfo) {
//             if (!userInfo) {
//               return res.status(200).json({
//                 apiMsg: "Invalid User Details",
//               });
//             } else if (!courseInfo) {
//               return res.status(200).json({
//                 apiMsg: "Invalid Course Details",
//               });
//             } else if (!courseProgressInfo) {
//               return res.status(200).json({
//                 apiMsg: "Course Progress Info not Found",
//               });
//             }
//           } else {
//             courseProgressInfo.paymentId = newPaymentId;
//             courseProgressInfo.currChapterIdx = 0;
//             courseProgressInfo.isCourseBought = true;

//             const castUserId = new mongoose.Schema.Types.ObjectId(userId);
//             const castCourseId = new mongoose.Schema.Types.ObjectId(courseId);
//             courseInfo.boughtby.push(castUserId);
//             userInfo.coursesBought.push(castCourseId);

//             await courseProgressInfo.save();
//             await courseInfo.save();
//             await userInfo.save();

//             paymentInfo.paymentStatus = "Success";
//             await paymentInfo.save();

//             return res.status(200).json({
//               apiMsg: "Stripe Payment Success",
//             });
//           }
//         }
//       } else {
//         paymentInfo.paymentStatus = "Failed";
//         await paymentInfo.save();

//         return res.status(400).json({
//           apiMsg: "Stripe error : Unhandled Event Type",
//         });
//       }
//     }
//     return res.status(400).json({
//       apiMsg: "Stripe error : Unhandled Event Type",
//     });
//   }
// };
