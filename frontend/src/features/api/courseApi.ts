import { allCoursesType, singleCoursesType } from "../../types/courses";
import { frontend_URL } from "../../components/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/course`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    allCourseData: builder.query<allCoursesType, void>({
      query: () => "/course",
    }),
    getSingleCourseData: builder.query<singleCoursesType, string>({
      query: (id) => `/course-details/${id}`,
    }),
  }),
});

export const { useAllCourseDataQuery, useLazyGetSingleCourseDataQuery } =
  courseApi;
