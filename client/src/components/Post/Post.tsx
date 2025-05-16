import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
import { IPost } from '../../interfaces/IPost';
import { postLike } from '../../api/mainAPI';
import styles from './styles.module.scss';

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.liked)
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  // console.log(post)


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
    <Box className={styles.post} sx={{ borderTop: 3, borderColor: 'background.default', color: 'text.primary'}}>
      <Link to={`/user/:${post.user._id}`}>
        <Box className={styles.person} >
          <Avatar src={post.user?.avatar ? `http://localhost:3000/uploads/${post.user.avatar}` : undefined}>
              {!post.user?.avatar && <PersonIcon />}
          </Avatar>
          <Box sx={{color: 'text.primary'}}>{post.user?.firstName} {post.user?.lastName}</Box>
        </Box>  
      </Link>


        <Box  className={styles.mainContent}>
          {post.image && (

              <img 
                src={`http://localhost:3000/uploads/${post.image}`} 
                alt="postImage" 
                className={styles.image}
              />
  
          )}

          <Link to={`/posts/${post._id}`}>
            <Box className={styles.text} sx={{color: 'text.primary'}}>
              <h3 className={styles.title}>{post.title}</h3>
              <div className={styles.message}>{post.message}</div>
            </Box>
          </Link>
              
            <Box sx={{ display: 'flex', gap: '15px', color: 'text.primary' }}>
              <Box className={styles.likes}>
                {liked
                  ? (<FavoriteIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/>) 
                  : (<FavoriteBorderIcon sx={{ color: 'red' }} onClick = {() => handleLike()}/> )
                }
                <span>{likesCount || 0}</span>
              </Box>
              <Link to={`/posts/${post._id}`}>
                <Box className={styles.comments} sx={{color: 'text.primary'}}>
                  <ChatBubbleOutlineIcon />
                  <span>0</span>
                </Box>
              </Link>
              <Box className={styles.likes}>
                <ShareIcon />
              </Box>
            </Box>

        </Box>
    </Box>
 
  );
};

export default Post;