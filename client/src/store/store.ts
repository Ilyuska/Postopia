import { configureStore } from '@reduxjs/toolkit';
import { postAPI } from './reducers/posts.slice';
import { meAPI } from './reducers/me.slice';
import { userAPI } from './reducers/user.slice';
import { favoritesAPI } from './reducers/favorites.slice';



export const store = configureStore({
  reducer: {
    [meAPI.reducerPath]: meAPI.reducer,
    [postAPI.reducerPath]: postAPI.reducer,
    [favoritesAPI.reducerPath]: favoritesAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(postAPI.middleware)
        .concat(meAPI.middleware)
        .concat(userAPI.middleware)
        .concat(favoritesAPI.middleware)
});


export type RootState = ReturnType<typeof store.getState>; //Получаем тип нашего состояния
export type AppDispatch = typeof store.dispatch; //Получаем типы диспатчей чтоб не могли вызвать того кого нет