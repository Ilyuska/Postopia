import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { IPost } from "../../interfaces/IPost"

interface INewPost {
    title: string, 
    message: string, 
    image: File | null
} 

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/posts', 
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
            headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
      },}), 
    tagTypes: ['Post'], 

    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], void>({ 
            query: () => ({
                url: ``,
            }),
            providesTags: (result) => result ? ['Post'] : []
        }),

        fetchOnePosts: build.query<IPost, string>({ 
            query: (postId) => ({
                url: `${postId}`,
            }),
        }),

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


