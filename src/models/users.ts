import mongoose, { Document } from "mongoose";

export interface Iuser extends Document {
  fullName: string;
  email: string;
  pic?: string;
  password: string;
  userType: string;
  isAdmin: boolean;
  coursesBought?: mongoose.Schema.Types.ObjectId[];
}

export enum userTypes {
  Student = "Student",
  Teacher = "Teacher",
}

const UserSchema = new mongoose.Schema<Iuser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    pic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
      default: "Student",
      enum: {
        values: Object.values(userTypes),
        message: `userType is Not a Valid Value`,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iuser>("User", UserSchema);
