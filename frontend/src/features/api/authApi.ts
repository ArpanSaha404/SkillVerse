import { LoginInputState, SignUpInputState } from "../../schema/userSchema";
import { frontend_URL } from "../../components/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { loginUserType, logoutUserType, registerUserType } from "@/types/user";
import { login, logout } from "../authSlice";

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
              fullName: result.data.user.fullName,
              email: result.data.user.email,
            })
          );
        } catch (error: any) {
          console.log(error.data.apiMsg);
        }
      },
    }),
    logOutUser: builder.query<logoutUserType, void>({
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
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLazyLogOutUserQuery,
} = authApi;
