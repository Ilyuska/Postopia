import { FC } from 'react';
import styles from './styles.module.scss';
import { IPost } from '../../interfaces/IPost';
import { Avatar, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';

interface PostProps {
  post: IPost;
}

const Post: FC<PostProps> = ({ post }) => {
  return (
    <Box className={styles.post}>
      <Box className={styles.person} sx={{ backgroundColor: 'primary.main' }}>
        <Avatar src={post.user?.avatar ? `http://localhost:3000/uploads/${post.user.avatar}` : undefined}>
            {!post.user?.avatar && <PersonIcon />}
        </Avatar>
        <span>{post.user?.name}</span>
      </Box>
      
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
            <FavoriteIcon sx={{ color: 'red' }} />
            <span>{post.likes?.length || 0}</span>
          </Box>
          <Box className={styles.comments}>
            <ChatBubbleOutlineIcon />
            <span>0</span>
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