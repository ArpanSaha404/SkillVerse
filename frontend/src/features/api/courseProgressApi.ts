import {
  courseProgressResType,
  updateChapterProgress,
  userPurchasedCoursesResponse,
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
      providesTags: ["Refetch_Progress"],
    }),
    updateChapterProgess: builder.mutation<
      courseProgressResType,
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
      invalidatesTags: ["Refetch_Progress"],
    }),
    updateVideoProgess: builder.mutation<
      courseProgressResType,
      { courseProgressId: string; idx: number; isCourseCompleted: boolean }
    >({
      query: (inputData) => ({
        url: "/progress-update",
        method: "PATCH",
        body: inputData,
      }),
      invalidatesTags: ["Refetch_Progress"],
    }),
    updateVideoChangeIdx: builder.mutation<
      courseProgressResType,
      { courseProgressId: string; idx: number }
    >({
      query: (inputData) => ({
        url: "/currvideo-update",
        method: "PATCH",
        body: inputData,
      }),
      invalidatesTags: ["Refetch_Progress"],
    }),
    getPurchasedCoursesByUserId: builder.query<
      userPurchasedCoursesResponse,
      { userId: string }
    >({
      query: ({ userId }) => ({
        url: "/course-list",
        params: { userId },
      }),
    }),
  }),
});

export const {
  useLazyFetchCourseProgressInfoQuery,
  useUpdateChapterProgessMutation,
  useUpdateCourseProgessMutation,
  useUpdateVideoProgessMutation,
  useUpdateVideoChangeIdxMutation,
  useLazyGetPurchasedCoursesByUserIdQuery,
  useGetPurchasedCoursesByUserIdQuery,
} = courseProgressApi;
