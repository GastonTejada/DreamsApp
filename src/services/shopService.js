import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { REACT_APP_baseUrl } from "@env"

const baseUrl = REACT_APP_baseUrl

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['profileImageGet', 'locationGet'],
    endpoints: (builder) => ({
        getActivities: builder.query({
            query: () => `activities.json`,
        }),
        getActivitiesById: builder.query({           
            query: (activityId) =>
                `activities.json?orderBy="id"&equalTo=${activityId}`,
            transformResponse: (response) => {                
                const responseTransformed = Object.values(response)                               
                if (responseTransformed.length) return responseTransformed[0]
                return null
            },                        
        }),       
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),        
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet']            
        }),
        getLocation: builder.query({
            query: (localId) => `locations/${localId}.json`,
            providesTags: ['locationGet']
        }),
        postLocation: builder.mutation({        
            query: ({location, localId}) => ({
                url: `locations/${localId}.json`,
                method: "PUT",
                body: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                    address: location.address,
                    updatedAt: location.updatedAt
                },
            }),
            invalidatesTags: ['locationGet']
        }), 
    }),
})

export const {    
    useGetActivitiesQuery,
    useGetActivitiesByIdQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    useGetLocationQuery,
    usePostLocationMutation,
} = shopApi
