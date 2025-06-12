import { IUser } from '../../interfaces/IUser';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userAPI', 
    tagTypes: ['User'], 

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000', 
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
      },}), 

    endpoints: (build) => ({
        getUser: build.query<IUser, string>({ 
            query: (userId) => ({
                url: `/user/${userId}`,
            }),
            providesTags: ['User']
        }),

        getUserPosts: build.query<IUser, void>({ 
            query: () => ({
                url: `/user:`,
            }),
            providesTags: ['User']
        }),
    })	
})