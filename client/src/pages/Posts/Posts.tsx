import { FC } from 'react';
import Post from '../../components/Post/Post';
import { postAPI } from '../../store/reducers/posts.slice';
import Loading from '../../components/Loading/Loading';
import { Box } from '@mui/material';

const Posts: FC = () => {
  const {data: posts, error, isLoading} =  postAPI.useFetchAllPostsQuery(localStorage.getItem('token') || '')
  // console.log(posts)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {isLoading && <Loading/>}
      {error && <Box sx={{color: 'primary.main', display: 'flex', justifyContent: 'center'}}>Произошла ошибка. Подробности в консоли</Box>}
      {posts && posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;