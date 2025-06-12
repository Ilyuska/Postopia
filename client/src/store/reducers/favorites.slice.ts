import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { PostResponse } from '../../interfaces/api/IPostResponse';

export const favoritesAPI = createApi({
    reducerPath: 'favoritesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/posts/favorites', 
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
      },}), 
    tagTypes: ['Favorites'], 

    endpoints: (build) => ({
        fetchAllPosts: build.query<PostResponse, { page: number }>({
            query: ({ page }) => ({
                url: `?page=${page}`,
            }),
            providesTags: ['Favorites'],
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
    })	
})


