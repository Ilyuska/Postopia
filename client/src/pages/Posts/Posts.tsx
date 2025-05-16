import { FC } from 'react';
import Post from '../../components/Post/Post';
import { postAPI } from '../../store/reducers/posts.slice';
import Loading from '../../components/Loading/Loading';
import { Box } from '@mui/material';
import styles from './styles.module.scss'

const Posts: FC = () => {
  const {data: posts, error, isLoading} =  postAPI.useFetchAllPostsQuery()
  // console.log(posts)

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper'}}>
      {isLoading && <Loading/>}
      {error && <Box sx={{color: 'primary.main', display: 'flex', justifyContent: 'center'}}>Произошла ошибка. Подробности в консоли</Box>}
      {posts && posts.map(post => (
        <Post post={post} key={post._id} />
      ))}
    </Box>
  );
};

export default Posts;