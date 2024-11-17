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
