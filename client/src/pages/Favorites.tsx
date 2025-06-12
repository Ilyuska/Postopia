import {FC} from 'react'
import { usePagination } from '../hooks/usePagination';
import Posts from '../components/Posts/Posts';
import { favoritesAPI } from '../store/reducers/favorites.slice';
import styles from './styles.module.scss'


const Favorites: FC = () => {
  const { favorites } = usePagination();
  const { data: posts, error, isLoading, isFetching } = favoritesAPI.useFetchAllPostsQuery({page: favorites.value})
  return (
    <Posts posts={posts} error = {error} isLoading = {isLoading} isFetching = {isFetching} currentPage={favorites}/>
  );
};

export default Favorites;