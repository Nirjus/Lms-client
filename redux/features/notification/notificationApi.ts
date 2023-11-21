import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllNotification: builder.query({
            query: () => ({
                url: "/notification/get-all-notification",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        updateNotification: builder.mutation({
            query: (id) => ({
                url: `/notification/update-notifications/${id}`,
                method: "PUT",
                credentials: "include" as const,
            })
        }),
    })
})

export const {useGetAllNotificationQuery, useUpdateNotificationMutation} = notificationApi;