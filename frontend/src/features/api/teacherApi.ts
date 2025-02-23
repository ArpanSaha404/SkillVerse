import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { frontend_URL } from "../../components/lib/utils";

export const teacherApi = createApi({
  reducerPath: "teacherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/teacher`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    checkNewCourse: builder.query<{ apiMsg: string }, string>({
      query: (course) => `/check-course?course=${course}`,
    }),
  }),
});

export const { useLazyCheckNewCourseQuery } = teacherApi;
