import { FC } from 'react';
import { postAPI } from '../store/reducers/posts.slice';
import { usePagination } from '../hooks/usePagination';
import Posts  from '../components/Posts/Posts';

const NewsPosts: FC = () => {  
  const { allPosts } = usePagination();
  const { data: posts, error, isLoading, isFetching } = postAPI.useFetchAllPostsQuery({page: allPosts.value})
  return (
    <Posts posts={posts} error = {error} isLoading = {isLoading} isFetching = {isFetching} currentPage={allPosts}/>
  );
};

export default NewsPosts;