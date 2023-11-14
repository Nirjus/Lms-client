import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: "/order/get-all-orders",
                method: "GET",
                credentials: "include" as const,
            })
        })
    })
})

export const {useGetAllOrdersQuery} = orderApi;