import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "/order/get-all-orders",
                method: "GET",
                credentials: "include" as const,
            })
        }),
        createOrder: builder.mutation({
            query: ({courseId, payment_info}) => ({
                url: "/order/create-order",
                method: "POST",
                body:{
                  courseId,
                  payment_info,  
                },
               credentials: "include" as const,
            })
        })
    })
})

export const {useGetAllOrdersQuery, useCreateOrderMutation} = orderApi;