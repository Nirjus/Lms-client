import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytice: builder.query({
            query: () => ({
                url: "/analytic/get-course-analytics",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getOrdersAnalytice: builder.query({
            query: () => ({
                url: "/analytic/get-order-analytics",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        getUsersAnalytice: builder.query({
            query: () => ({
                url: "/analytic/get-user-analytics",
                method: "GET",
                credentials: "include" as const,
            })
        }),
    })
})
export const {useGetCoursesAnalyticeQuery, useGetOrdersAnalyticeQuery, useGetUsersAnalyticeQuery} = analyticsApi;
