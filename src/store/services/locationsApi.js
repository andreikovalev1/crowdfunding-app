import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
    keepUnusedDataFor: 300,
    tagTypes: ["Plots", "Locations"],
    endpoints: (builder) => ({
        getLocations: builder.query({
            query: () => "/users?limit=50",
            transformResponse: (response) => ({
                ...response,
                users: response.users.map(user => {
                    const city = user.address.city;
                    const country = user.address.country;
                    const searchTerms = `${city},${country},land,aerial,nature`;
                    
                    return {
                        ...user,
                        landImage: `https://source.unsplash.com/featured/900x400?${encodeURIComponent(searchTerms)}&sig=${user.id}`,
                        backupImage: `https://loremflickr.com/900/400/landscape,field?lock=${user.id}`
                    };
                })
            }),
            providesTags: ["Locations"],
        }),
        
        getPlots: builder.query({
            query: (category = "furniture") => `/products/category/${category}`,
            providesTags: ["Plots"],
        }),
    }),
});

export const { useGetLocationsQuery, useGetPlotsQuery } = locationsApi;