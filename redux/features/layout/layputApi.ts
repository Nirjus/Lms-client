import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getHeroData: builder.query({
            query:(type) => ({
                url: `/layout/get-layout/${type}`,
                method:"GET",
                credentials: "include" as const,
            })
        }),
        editLAyout: builder.mutation({
            query:({type, image, title, subtitle, faq, category}) => ({
                url: `/layout/edit-layout`,
                method:"PUT",
                body:{
                    type,image,title,subtitle,faq,category
                },
                credentials: "include" as const,
            })
        }),
    })
})

export const {useGetHeroDataQuery, useEditLAyoutMutation} = layoutApi;