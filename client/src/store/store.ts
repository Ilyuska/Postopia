import { configureStore } from '@reduxjs/toolkit';
import { postAPI } from './reducers/posts.slice';
import { userAPI } from './reducers/user.slice';



export const store = configureStore({
  reducer: {
    [postAPI.reducerPath]: postAPI.reducer, //Прикручиваем наш reducer 
    [userAPI.reducerPath]: userAPI.reducer,
    // favoritesPosts: ,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
        .concat(postAPI.middleware)
        .concat(userAPI.middleware),
});


export type RootState = ReturnType<typeof store.getState>; //Получаем тип нашего состояния
export type AppDispatch = typeof store.dispatch; //Получаем типы диспатчей чтоб не могли вызвать того кого нет