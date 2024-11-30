import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  allCoursesType,
  creatorPic,
  singleCoursesType,
} from "../../types/courses";
import { frontend_URL } from "../../components/lib/utils";

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
    getCreatorInfo: builder.query<creatorPic, string>({
      query: (creatorId) => `/course-details/creator?creatorId=${creatorId}`,
    }),
  }),
});

export const {
  useAllCourseDataQuery,
  useLazyGetSingleCourseDataQuery,
  useLazyGetCreatorInfoQuery,
} = courseApi;
