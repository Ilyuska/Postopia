import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { IPost } from "../../interfaces/IPost"

export const postAPI = createApi({
    reducerPath: 'postAPI', //Имя Service
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000/posts'}), //Куда запрос кидать
    tagTypes: ['Post'], 
    endpoints: (build) => ({
        // .query только для get запроса
        fetchAllPosts: build.query<IPost[], string>({ 
            query: (token) => ({
                url: ``,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
            providesTags: (result) => result ? ['Post'] : []
        }),

        // .mutation для запроса который изменяет данные (POST, PUT, DELETE)
        createPost: build.mutation<IPost, IPost> ({
            query: (post) => ({ //Параметр это новый пост
                url: ``, //Приписка куда идет запрос после baseUrl
                method: 'POST', //Метод запроса
                body: post //Добавляем обьект post в body
            }),
            invalidatesTags: ['Post'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        updatePost: build.mutation<IPost, IPost>({ 
            query: (post) => ({
                url: `/${post.id}`, //Достаем post.id как параметр запроса
                method: 'PATCH',
                body: post
            }),
            invalidatesTags: ['Post']
        }),

        deletePost: build.mutation<IPost, IPost>({ 
            query: (post) => ({
                url: `/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        }),
    })	
})


