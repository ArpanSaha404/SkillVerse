import mongoose, { Document } from "mongoose";

export interface Iuser extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  fullName: string;
  email: string;
  pic: string;
  password: string;
  userType: string;
  isVerified: boolean;
  isAdmin: boolean;
  coursesBought: mongoose.Schema.Types.ObjectId[];
  coursesCreated: mongoose.Schema.Types.ObjectId[];
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    coursesBought: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    coursesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Iuser>("User", UserSchema);
