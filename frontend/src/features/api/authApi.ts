import {
  LoginInputState,
  ResetPasswordInputState,
  SignUpInputState,
} from "../../schema/userSchema";
import { frontend_URL } from "../../components/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  loginUserType,
  registerUserType,
  responseType,
  sendMailType,
  verifyAccountInputType,
  verifyAccountType,
} from "../../types/user";
import { signup, login, logout } from "../authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/users`,
    // credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<registerUserType, SignUpInputState>({
      query: (inputData) => ({
        url: "/register",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            signup({
              email: result.data.email,
            })
          );
        } catch (error: any) {
          console.log(error.data.apiMsg);
        }
      },
    }),
    loginUser: builder.mutation<loginUserType, LoginInputState>({
      query: (inputData) => ({
        url: "/login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            login({
              email: result.data.user.email,
              fullName: result.data.user.fullName,
              pic: result.data.user.pic,
              userType: result.data.user.userType,
              isAdmin: result.data.user.isAdmin,
              isVerified: result.data.user.isVerified,
            })
          );
        } catch (error: any) {
          console.log(error.data.apiMsg);
        }
      },
    }),
    logOutUser: builder.query<responseType, void>({
      query: () => "/logout",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(logout());
        } catch (error: any) {
          console.log(error.data.apiMsg);
        }
      },
    }),
    sendMail: builder.mutation<responseType, sendMailType>({
      query: (inputData) => ({
        url: "/sendMailAgain",
        method: "POST",
        body: inputData,
      }),
    }),
    verifyAccount: builder.mutation<verifyAccountType, verifyAccountInputType>({
      query: (inputData) => ({
        url: "/verify-account",
        method: "PATCH",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            login({
              email: result.data.userDetails.email,
              fullName: result.data.userDetails.fullName,
              pic: result.data.userDetails.pic,
              userType: result.data.userDetails.userType,
              isAdmin: result.data.userDetails.isAdmin,
              isVerified: result.data.userDetails.isVerified,
            })
          );
        } catch (error: any) {
          console.error(error.data.apiMsg);
        }
      },
    }),
    resetPassword: builder.mutation<responseType, ResetPasswordInputState>({
      query: (inputData) => ({
        url: "/reset-password",
        method: "PATCH",
        body: inputData,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogOutUserQuery,
  useSendMailMutation,
  useVerifyAccountMutation,
  useResetPasswordMutation,
} = authApi;
