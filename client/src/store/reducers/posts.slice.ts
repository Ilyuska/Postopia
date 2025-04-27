import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { IPost } from "../../interfaces/IPost"

interface INewPost {
    title: string, 
    message: string, 
    image: File | null
} 

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
        createPost: build.mutation<IPost, INewPost> ({
            query: ({title, message, image}) => ({ //Параметр это новый пост
                url: ``, //Приписка куда идет запрос после baseUrl
                method: 'POST', //Метод запроса
                body: {title, message, image}, //Добавляем обьект post в body
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Post'] //Указываем что текущие сведения устарели и просим заново сделать запрос
        }),

        updatePost: build.mutation<IPost, IPost>({ 
            query: (post) => ({
                url: `/${post._id}`, //Достаем post.id как параметр запроса
                method: 'PATCH',
                body: post,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Post']
        }),

        deletePost: build.mutation<IPost, IPost>({ 
            query: (post) => ({
                url: `/${post._id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }),
            invalidatesTags: ['Post']
        }),
    })	
})


