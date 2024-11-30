import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { paymentReq, paymentRes } from "../../types/payments";
import { frontend_URL } from "../../components/lib/utils";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/payments`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    newPaymentSession: builder.mutation<paymentRes, paymentReq>({
      query: (inputData) => ({
        url: `/payment`,
        method: "POST",
        body: inputData,
      }),
    }),
  }),
});

export const { useNewPaymentSessionMutation } = paymentsApi;
