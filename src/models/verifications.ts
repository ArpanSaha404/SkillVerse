import mongoose, { Document } from "mongoose";

export interface IVerification extends Document {
  email: string;
  verificationTypes: string;
  verificationCode: string;
  verificationExiresAt: Date;
}

export enum verificationTypes {
  verifyAccount = "verifyAccount",
  resetPassword = "resetPassword",
}

const VerificationSchema = new mongoose.Schema<IVerification>(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    verificationTypes: {
      type: String,
      required: true,
      enum: {
        values: Object.values(verificationTypes),
        message: `verificationTypes is Not a Valid Value`,
      },
    },
    verificationCode: {
      type: String,
      required: true,
    },
    verificationExiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IVerification>(
  "Verification",
  VerificationSchema
);
