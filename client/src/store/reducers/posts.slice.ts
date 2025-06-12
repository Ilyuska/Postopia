import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { IPost } from "../../interfaces/IPost"
import { PostResponse } from '../../interfaces/api/IPostResponse';

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
    keepUnusedDataFor: 300,

    endpoints: (build) => ({
        fetchAllPosts: build.query<PostResponse, { page: number }>({
            query: ({ page }) => ({
                url: `?page=${page}`,
            }),
            providesTags: ['Post'],
            // Правильно объединяем данные при подгрузке новых страниц
            merge: (currentCache, newItems, { arg }) => {
                if (arg.page === 1) {
                    return newItems;
                }
                return {
                    posts: [...currentCache.posts, ...newItems.posts],
                    pagination: newItems.pagination
                };
            },
            // Принудительно обновляем данные при изменении страницы
            forceRefetch({ currentArg, previousArg }) {
                return currentArg?.page !== previousArg?.page;
            },
            // Используем единый ключ для кэша
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
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


