import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Skeleton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { IPost } from '../../interfaces/IPost';
import { postLike } from '../../api/mainAPI';
import styles from './styles.module.scss';
import MyAvatar from '../MyAvatar';

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes);
  const navigate = useNavigate()

  const handleLike = async () => {
    try {
      await postLike(post._id);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Ошибка при лайке поста:", error);
    }
  }


  return (
    <Box className={styles.post} sx={{ borderTop: 3, borderColor: 'background.default', color: 'text.primary'}}>
      <Box className={styles.person} onClick={()=> navigate(`/user/:${post.user._id}`)} >
        <MyAvatar avatar={String(post.user.avatar)} firstName = {post.user.firstName} />
        <Box sx={{color: 'text.primary'}} width={'90%'}>
        { 
          post.user.firstName 
          ? `${post.user.firstName} ${post.user.lastName}`
          : (<Skeleton height={30} />)
        }
        </Box>
      </Box>  

      <Box  className={styles.mainContent}>
        {post.image && (
            <img 
              src={`http://localhost:3000/uploads/${post.image}`} 
              alt="postImage" 
              className={styles.image}
            />
        )}

            {post.title 
              ? (<Box className={styles.text} sx={{color: 'text.primary'}} onClick={()=> navigate(`/posts/${post._id}`)}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <div className={styles.message}>{post.message}</div>
                </Box>
              ): (<Box className={styles.text} sx={{height: 90}}>
                  <Skeleton variant='rounded' className={styles.title} height={28}/> 
                  <Skeleton variant='rounded' className={styles.message} height={52}/>
                </Box>)
            }

          <Box sx={{ display: 'flex', gap: '15px', color: 'text.primary' }}>
            <Box className={styles.likes}>
              {liked
                ? (<FavoriteIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/>) 
                : (<FavoriteBorderIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/> )
              }
              <span>{likesCount}</span>
            </Box>
            <Box className={styles.comments} sx={{color: 'text.primary'}} onClick={()=> navigate(`/posts/${post._id}`)}>
              <ChatBubbleOutlineIcon />
              <span>{post.comments}</span>
            </Box>
            <Box className={styles.likes}>
              <ShareIcon />
            </Box>
          </Box>
        </Box>
    </Box>

  );
};

export default Post;