import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "/course/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `/course/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editeCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `/course/edit-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUserAllCourses: builder.query({
      query: () => ({
        url: "/course/getAll-course",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCoursesDetails: builder.query({
      query: (id) => ({
        url: `/course/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
        query: (id) => ({
            url: `/course/get-course-content/${id}`,
            method: "GET",
            credentials: "include" as const,
        })
    }),
    addNewQuestion: builder.mutation({
      query: ({question, courseId, contentId}) => ({
          url: `/course/add-question`,
          method: "PUT",
          body:{
            question, courseId, contentId
          },
          credentials: "include" as const,
      })
  }),
  addAnswer:builder.mutation({
    query: ({ answer, courseId, contentId, questionId}) => ({
       url: "/course/add-answer",
       method: "PUT",
       body:{
        answer, courseId, contentId, questionId
       },
       credentials: "include" as const,
    })
  }),
  addReviewInCourse:builder.mutation({
    query: ({ review, rating, courseId}) => ({
       url: `/course/add-review/${courseId}`,
       method: "PUT",
       body:{
        review, rating
       },
       credentials: "include" as const,
    })
  }),
    addReplyInReview: builder.mutation({
      query: ({comment, courseId, reviewId}) => ({
        url: "/course/add-reply",
        method: "PUT",
        body:{
          comment, courseId, reviewId
        },
        credentials: "include" as const,
      }) 
    })
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditeCourseMutation,
  useGetUserAllCoursesQuery,
  useGetCoursesDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
} = courseApi;
