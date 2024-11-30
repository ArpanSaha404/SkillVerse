import mongoose, { Document } from "mongoose";

export interface IPayments extends Document {
  paymentId: string;
  paymentStatus: string;
  courseName: string;
  coursePrice: number;
  createdBy: string;
  courseId: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  creatorId: mongoose.Schema.Types.ObjectId;
}

export enum paymentStatusTypes {
  Pending = "Pending",
  Success = "Success",
  Failed = "Failed",
}

const PaymentSchema = new mongoose.Schema<IPayments>(
  {
    paymentId: {
      type: String,
      unique: true,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: "Pending",
      enum: {
        values: Object.values(paymentStatusTypes),
        message: `payment Status Type is Not a Valid Value`,
      },
    },
    courseName: {
      type: String,
      default: "",
    },
    coursePrice: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
      default: "",
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IPayments>("Payment", PaymentSchema);
