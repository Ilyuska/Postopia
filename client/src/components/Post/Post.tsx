import { FC, useState } from 'react';
import styles from './styles.module.scss';
import { IPost } from '../../interfaces/IPost';
import { Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { postLike } from '../../api/mainAPI';
import { Link } from 'react-router-dom';
import { userAPI } from '../../store/reducers/user.slice';

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const {data: me} =  userAPI.useGetMeQuery()


  const handleLike = async () => {
    try {
      await postLike(post._id);
      setLiked(!liked);
      setLikesCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      console.error("Ошибка при лайкании поста:", error);
    }
  }


  return (
    <Box className={styles.post}>
      <Link to={post.user._id===me?._id ? '/me': `/user/:${post.user._id}`}>
        <Box className={styles.person} sx={{ backgroundColor: 'primary.main' }}>
          <Avatar src={post.user?.avatar ? `http://localhost:3000/uploads/${post.user.avatar}` : undefined}>
              {!post.user?.avatar && <PersonIcon />}
          </Avatar>
          <span>{post.user?.name}</span>
        </Box>
      </Link>

      <Box sx={{ backgroundColor: 'secondary.main' }} className={styles.mainContent}>
        {post.image && (
          <img 
            src={`http://localhost:3000/uploads/${post.image}`} 
            alt="postImage" 
            className={styles.image}
          />
        )}
        
        <Box className={styles.text}>
          <h3 className={styles.title}>{post.title}</h3>
          <div className={styles.message}>{post.message}</div>
        </Box>
        
        <Box sx={{ display: 'flex', gap: '15px', py: '5px' }}>
          <Box className={styles.likes}>
            {liked
              ? (<FavoriteIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/>) 
              : (<FavoriteBorderIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/> )
            }
            <span>{likesCount || 0}</span>
          </Box>
          {/* <Box className={styles.comments}>
            <ChatBubbleOutlineIcon />
            <span>0</span>
          </Box> */}
          <Box className={styles.likes}>
            <ShareIcon />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Post;