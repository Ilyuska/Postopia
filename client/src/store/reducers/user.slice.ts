import { ILoginData, IRegisterData, IUser } from './../../interfaces/IUser';
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

interface IMe extends IUser{
    token: string
}

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
        login: build.mutation <IMe, ILoginData> ({
            query: (userData) => ({
                url: `/login`, 
                method: 'POST', 
                body: userData
            }),
            invalidatesTags: ['User'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        registration: build.mutation<IMe, IRegisterData > ({
            query: (userData) => ({ 
                url: `/registration`, 
                method: 'POST',
                body: userData 
            }),
            invalidatesTags: ['User'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        getMe: build.query<IMe, void>({ 
            query: () => ({
                url: `/me`,
            }),
            providesTags: (result) => result ? ['User'] : []
        }),

        updateMe: build.mutation<IMe, IUser>({ 
            query: (userData) => ({
                url: `/me`, //Достаем post.id как параметр запроса
                method: 'PATCH',
                body: userData,
            }),
            invalidatesTags: ['User']
        }),

        deleteMe: build.mutation<void, {token: string}>({ 
            query: () => ({
                url: `/me`,
                method: 'DELETE',
            }),
            invalidatesTags: ['User']
        }),
    })	
})


export const {
    util: { resetApiState }, // Ключевые утилиты
  } = userAPI;