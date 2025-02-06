import {
  LoginInputState,
  ResetPasswordInputState,
  SignUpInputState,
} from "../../schema/userSchema";
import { frontend_URL } from "../../components/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  changePassDltAccType,
  loginUserType,
  registerUserType,
  responseType,
  sendMailType,
  updateProfilePicType,
  verifyAccountInputType,
} from "../../types/user";
import { signup, login, logout } from "../authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/users`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkAuth: builder.query<loginUserType, void>({
      query: () => "/check-auth",
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.user) {
            const userData = result.data.user;
            dispatch(
              login({
                _id: userData._id,
                email: userData.email,
                fullName: userData.fullName,
                pic: userData.pic,
                userType: userData.userType,
                isVerified: userData.isVerified,
                isAdmin: userData.isAdmin,
                coursesBought: userData.coursesBought,
                coursesCreated: userData.coursesCreated,
              })
            );
          }
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
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
          console.log(error);
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
          if (result.data.user) {
            const userData = result.data.user;
            dispatch(
              login({
                _id: userData._id,
                email: userData.email,
                fullName: userData.fullName,
                pic: userData.pic,
                userType: userData.userType,
                isVerified: userData.isVerified,
                isAdmin: userData.isAdmin,
                coursesBought: userData.coursesBought,
                coursesCreated: userData.coursesCreated,
              })
            );
          }
        } catch (error: any) {
          console.log(error);
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
          console.log(error);
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
    verifyAccount: builder.mutation<loginUserType, verifyAccountInputType>({
      query: (inputData) => ({
        url: "/verify-account",
        method: "PATCH",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.user) {
            const userData = result.data.user;
            dispatch(
              login({
                _id: userData._id,
                email: userData.email,
                fullName: userData.fullName,
                pic: userData.pic,
                userType: userData.userType,
                isVerified: userData.isVerified,
                isAdmin: userData.isAdmin,
                coursesBought: userData.coursesBought,
                coursesCreated: userData.coursesCreated,
              })
            );
          }
        } catch (error: any) {
          console.log(error);
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
    updateProfile: builder.mutation<responseType, changePassDltAccType>({
      query: (inptData) => ({
        url: "/update-profile",
        method: "PUT",
        body: inptData,
      }),
    }),
    updatePic: builder.mutation<updateProfilePicType, FormData>({
      query: (inputData) => ({
        url: "/update-pic",
        method: "PATCH",
        body: inputData,
      }),
    }),
  }),
});

export const {
  useLazyCheckAuthQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogOutUserQuery,
  useSendMailMutation,
  useVerifyAccountMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUpdatePicMutation,
} = authApi;
