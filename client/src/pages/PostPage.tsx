import {FC} from 'react'
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import Post from '../components/Post/Post';
import { postAPI } from '../store/reducers/posts.slice';


const PostPage: FC = () => {
  const location = useLocation()
  const postId = location.pathname.split('/')[2]

  const {data: post, error, isLoading} =  postAPI.useFetchOnePostsQuery(postId)
  console.log(post)
  

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', backgroundColor: 'background.paper'}}>
      {error && <Box sx={{color: 'primary.main', display: 'flex', justifyContent: 'center'}}>Произошла ошибка. Подробности в консоли</Box>}
      {post && (
        <Post post={post} key={post._id} />
      )}
    </Box>
  );
};

export default PostPage;