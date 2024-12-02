import {
  commonProgressResType,
  courseProgressResType,
  updateChapterProgress,
} from "../../types/courseProgress";
import { frontend_URL } from "../../components/lib/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseProgressApi = createApi({
  reducerPath: "courseProgressApi",
  tagTypes: ["Refetch_Progress"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${frontend_URL}/api/course-progress`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    fetchCourseProgressInfo: builder.query<
      courseProgressResType,
      { progresscode: String }
    >({
      query: ({ progresscode }) => ({
        url: "/course-progress",
        params: { progresscode },
      }),
    }),
    fetchChapterProgressInfo: builder.query({
      query: ({ progresscode }) => ({
        url: "/chapter-progress",
        params: { progresscode },
      }),
      providesTags: ["Refetch_Progress"],
    }),
    updateChapterProgess: builder.mutation<
      commonProgressResType,
      updateChapterProgress
    >({
      query: (inputData) => ({
        url: "/chapter-update",
        method: "PATCH",
        body: inputData,
      }),
      invalidatesTags: ["Refetch_Progress"],
    }),
    updateCourseProgess: builder.mutation<
      courseProgressResType,
      { courseProgressId: string; status: boolean }
    >({
      query: (inputData) => ({
        url: "/course-update",
        method: "PATCH",
        body: inputData,
      }),
    }),
  }),
});

export const {
  useLazyFetchCourseProgressInfoQuery,
  useLazyFetchChapterProgressInfoQuery,
  useUpdateChapterProgessMutation,
  useUpdateCourseProgessMutation,
} = courseProgressApi;
