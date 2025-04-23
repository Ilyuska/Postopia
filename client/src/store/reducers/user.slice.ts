import { ILoginData, IRegisterData, IUser } from './../../interfaces/IUser';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

export const userAPI = createApi({
    reducerPath: 'userAPI', 
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}), 
    tagTypes: ['User'], 
    endpoints: (build) => ({
        getMe: build.query<IUser, string>({ 
            query: (token) => ({
                url: `/me`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result) => result ? ['User'] : []
        }),

        login: build.mutation <{ token: string }, ILoginData> ({
            query: (userData) => ({
                url: `/login`, 
                method: 'POST', 
                body: userData
            }),
            invalidatesTags: ['User'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        registration: build.mutation<{ token: string }, IRegisterData > ({
            query: (userData) => ({ 
                url: `/registration`, 
                method: 'POST',
                body: userData 
            }),
            invalidatesTags: ['User'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        updatePost: build.mutation<IUser, {token: string, user: IUser}>({ 
            query: ({token, user}) => ({
                url: `/me`, //Достаем post.id как параметр запроса
                method: 'PATCH',
                body: user,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['User']
        }),

        deletePost: build.mutation<void, {token: string}>({ 
            query: (token) => ({
                url: `/me`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            invalidatesTags: ['User']
        }),
    })	
})


