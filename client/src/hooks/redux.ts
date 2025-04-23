import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>(); //Типизируем хук useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; //Типизируем хук useSelector