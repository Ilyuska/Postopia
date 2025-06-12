import { useContext } from 'react';
import { PaginationContext } from '../contexts';


export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination must be used within PaginationProvider');
  }
  return context;
};