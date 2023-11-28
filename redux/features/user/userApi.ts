import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ name, avatar }) => ({
        url: "/user/update-user",
        method: "PUT",
        body: {
          name,
          avatar,
        },
        credentials: "include" as const,
      }),
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "/user/update-password",
        method: "PUT",
        body: {
          oldPassword,
          newPassword,
        },
        credentials: "include" as const,
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/get-all-users",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    updateUserRole: builder.mutation({
      query: ({ email, role }) => ({
        url: "/user/update-user-role",
        method: "PUT",
        body: { email, role },
        credentials: "include" as const,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/delete-user/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/user/forgot-password",
        method: "POST",
        body: {
          email,
        },
        credentials: "include" as const,
      }),
    }),
    resetPassword: builder.mutation({
        query: ({token, newPassword}) => ({
            url: "/user/reset-password",
            method: "POST",
            body:{
                token, newPassword
            },
            credentials: "include" as const,
        })
    }),
    getAllCreaters: builder.query({
      query: () => ({
        url: "/user/get-all-creaters",
        method: "GET",
        credentials: "include" as const,
      })
    }),
  }),
});

export const {
  useUpdateUserMutation,
  useUpdatePasswordMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetAllCreatersQuery,
} = userApi;
