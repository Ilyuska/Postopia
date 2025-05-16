import {FC, useState} from 'react'
import { Link } from 'react-router-dom';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import { Box, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import styles from './styles.module.scss'
import { userAPI } from '../../store/reducers/user.slice';



const NavBar: FC = () => {
  const alignButtons = {
    paddingLeft: '10px',
    width: '100%', 
    display: 'flex', 
    justifyContent: 'start'
  }

  const {data: me} =  userAPI.useGetMeQuery()

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const onClick = () => {
      setIsOpen(!isOpen)
    }

  return (
      <Box className={styles.navBar}>
        <Button sx={{color: 'text.primary', ...alignButtons }}> 
          <Link to={`/user/:${me?._id}`} className={styles.imgBtn} style={{ color: 'inherit' }}> 
              <PersonIcon/>
            <span>Профиль</span></Link>
        </Button>
        <Button sx={{color: 'text.primary', ...alignButtons}}> 
          <Link to='/posts' className={styles.imgBtn}  style={{ color: 'inherit' }}> 
            <ReorderIcon/>  
            <span >Посты</span>
          </Link>
        </Button>
        <Button sx={{color: 'text.primary', ...alignButtons}}> 
          <Link to='/favorites' className={styles.imgBtn} style={{ color: 'inherit' }}>
            <FavoriteIcon sx={{color: 'red'}}/> 
            <span>Понравившееся</span>
          </Link>
        </Button>
        <Button sx={{color: 'text.primary', ...alignButtons}}> 
          <Link to='/notifications' className={styles.imgBtn} style={{ color: 'inherit' }}>
            <NotificationsNoneIcon/> 
            <span>Уведомления</span>
          </Link>
        </Button>
        <Button 
          variant='contained' 
          sx={{width:'100%', marginTop: '10px'}}
          onClick={onClick}
        >
          <AddIcon/>
          Create Post
        </Button>
      <CreatePostForm isOpen = {isOpen} setIsOpen={onClick}/>
      </Box>
  );
};

export default NavBar;