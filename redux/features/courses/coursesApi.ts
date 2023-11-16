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
                url:"/course/get-all-courses",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        deleteCourse: builder.mutation({
            query: (id) => ({
                url:`/course/delete-course/${id}`,
                method: "DELETE",
                credentials: "include" as const,
            })
        }),
        editeCourse: builder.mutation({
            query: ({id,data}) => ({
                url:`/course/edit-course/${id}`,
                method: "PUT",
                body:data,
                credentials: "include" as const,
            })
        }),
        getUserAllCourses: builder.query({
            query: () => ({
                url: "/course/getAll-course",
                method: "GET",
                credentials: "include" as const,
            })
        }),
    }),
});

export const {useCreateCourseMutation, useGetAllCoursesQuery, useDeleteCourseMutation, useEditeCourseMutation,useGetUserAllCoursesQuery} = courseApi;