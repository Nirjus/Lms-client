import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateUser: builder.mutation({
           query:({name,avatar}) => ({
            url: "/user/update-user",
            method: "PUT",
            body:{
                name,
                avatar,
            },
           credentials: "include" as const,
           })
        }),
        updatePassword: builder.mutation({
            query:({oldPassword,newPassword}) => ({
             url: "/user/update-password",
             method: "PUT",
             body:{
                oldPassword,
                 newPassword,
             },
            credentials: "include" as const,
            })
         }),
    })
    
})

export const {useUpdateUserMutation,useUpdatePasswordMutation} = userApi;