import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithDynamicUrl from './baseApi'

export const api = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithDynamicUrl,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    refetchOnMountOrArgChange: true,
    tagTypes: ['Nimadir', 'Kimdir', 'Login', "Users", "ADS", "SNOW", "BANNERS"],
    endpoints: (builder) => ({
        nimadir: builder.query({
            query: (params) => ({
                url: '/nimadir',
                method: 'GET',
                params,
            }),
            providesTags: ['Nimadir'],
        }),
        kimdir: builder.mutation({
            query: (body) => ({
                url: '/kimdir',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Kimdir'],
        }),

        //LOGIN API
        login: builder.mutation({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Login'],
        }),
        getProfile: builder.query({
            query: () => ({
                url: '/profile',
                method: 'GET',
                // params,
            }),
            providesTags: ['Login'],
        }),
        updateProfile: builder.mutation({
            query: (body) => ({
                url: '/user/update-profile',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Users'],
        }),
        updateProfilePhoto: builder.mutation({
            query: (formData) => ({
                url: '/user/profile-photo',
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['Users'],
        }),

        //SNOW ANIMATION
        snow: builder.query({
            query: (params) => ({
                url: '/snow',
                method: 'GET',
                params
            }),
            providesTags: ['SNOW'],
        }),
        snowEdit: builder.mutation({
            query: (body) => ({
                url: `/snow`,
                method: 'PUT',
                body

            }),
            invalidatesTags: ['SNOW'],
        }),

        //ROLES
        getUserRoles: builder.query({
            query: (params) => ({
                url: '/roles',
                method: 'GET',
                params,
            }),
            providesTags: ['Users'],
        }),

        //ADS
        allAds: builder.query({
            query: (params) => ({
                url: '/ads',
                method: 'GET',
                params
            }),
            providesTags: ['ADS'],
        }),
        byIdAds: builder.query({
            query: (params) => ({
                url: `/ads/${params.id}`,
                method: 'GET',
                // params,
            }),
            providesTags: ['ADS'],
        }),
        createAds: builder.mutation({
            query: (formData) => ({
                url: '/ads',
                method: 'POST',
                body: formData,
                // headers: { 'Content-Type': 'multipart/form-data' }  <= buni OLIB TASHLANG
            }),
            invalidatesTags: ['ADS'],
        }),
        updateAds: builder.mutation({
            query: (body) => ({
                url: `/ads/${body.id}`,
                method: 'PUT',

            }),
            invalidatesTags: ['ADS'],
        }),
        deleteAds: builder.mutation({
            query: (body) => ({
                url: `/ads/${body.id}`,
                method: 'DELETE',

            }),
            invalidatesTags: ['ADS'],
        }),


        //BANNERS CRUD
        getBanners: builder.query({
            query: (params) => ({
                url: "/banner",
                method: "GET",
                params
            }),
            providesTags: ["BANNERS"],
        }),

        getBannerById: builder.query({
            query: (params) => ({
                url: `/banner/${params.id}`,
                method: "GET",
            }),
            providesTags: ["BANNERS"],
        }),

        createBanner: builder.mutation({
            query: (formData) => ({
                url: "/banner",
                method: "POST",
                body: formData,      
            }),
            invalidatesTags: ["BANNERS"],
        }),

        updateBanner: builder.mutation({
            query: (formData) => ({
                url: `/banner/${formData.id}`,
                method: "PUT",
                body: formData,        
            }),
            invalidatesTags: ["BANNERS"],
        }),

        deleteBanner: builder.mutation({
            query: (body) => ({
                url: `/banner/${body.id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["BANNERS"],
        }),


    })
})

export const {
    useNimadirQuery,
    useKimdirMutation,

    //LOGIN
    useLoginMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useUpdateProfilePhotoMutation,

    //ROLES
    useGetUserRolesQuery,

    //ADS
    useAllAdsQuery,
    useByIdAdsQuery,
    useCreateAdsMutation,
    useUpdateAdsMutation,
    useDeleteAdsMutation,

    //SNOW ANIMATION
    useSnowQuery,
    useSnowEditMutation,

     //BANNERS
    useGetBannersQuery,
    useGetBannerByIdQuery,
    useCreateBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation,

} = api