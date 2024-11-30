import { frontend_URL } from "../../components/lib/utils";
import { categoryResponse } from "../../types/courseCategories";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/category`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    allCategoriesData: builder.query<categoryResponse, void>({
      query: () => "/category",
    }),
  }),
});

export const { useAllCategoriesDataQuery } = categoryApi;
