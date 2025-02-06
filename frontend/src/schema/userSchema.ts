import { z } from "zod";

//Sign UP
export const userSignUpSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid Email"),
    password: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    userType: z.string().optional(),
  })
  .refine(
    (data) => {
      if (
        data.confirmPassword.length >= 6 &&
        data.confirmPassword.length <= 12
      ) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export type SignUpInputState = z.infer<typeof userSignUpSchema>;

//Log In
export const userLoginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(6, "Password should have a minimum of 6 characters")
    .max(12, "Password can have max 12 characters"),
});

export type LoginInputState = z.infer<typeof userLoginSchema>;

//Reset Password
export const userResetPasswordSchema = z
  .object({
    email: z.string().email("Invalid Email"),
    otp: z.string(),
    password: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
  })
  .refine(
    (data) => {
      if (
        data.confirmPassword.length >= 6 &&
        data.confirmPassword.length <= 12
      ) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"],
    }
  );

export type ResetPasswordInputState = z.infer<typeof userResetPasswordSchema>;

//Change Password / Delete Account
export const userChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    newPassword: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    confirmNewPassword: z
      .string()
      .min(6, "Password should have a minimum of 6 characters")
      .max(12, "Password can have max 12 characters"),
    text: z.string({
      required_error: "Text is required",
      invalid_type_error: "Entered Filed Must be a String",
    }),
  })
  .refine(
    (data) => {
      if (
        data.confirmNewPassword.length >= 6 &&
        data.confirmNewPassword.length <= 12
      ) {
        return data.newPassword === data.confirmNewPassword;
      }
      return true;
    },
    {
      message: "Passwords must match",
      path: ["confirmNewPassword"],
    }
  );

export type ChnagePasswordInputState = z.infer<typeof userChangePasswordSchema>;
