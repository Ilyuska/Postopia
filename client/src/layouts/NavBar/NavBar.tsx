import {FC} from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Box, Button, ButtonGroup } from '@mui/material';
import styles from './styles.module.scss'
// import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonIcon from '@mui/icons-material/Person';
import ReorderIcon from '@mui/icons-material/Reorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AddIcon from '@mui/icons-material/Add';


const NavBar: FC = () => {
  const alignButtons = {
    paddingLeft: '10px',
    width: '100%', 
    display: 'flex', 
    justifyContent: 'start'
  }

  return (
    <div className={styles.navBar}>
      <Box sx={{ display: 'flex', flexDirection: 'column'}}>
        <Button sx={{color: 'text.primary', ...alignButtons }}> 
          <Link to='/profile' className={styles.imgBtn} style={{ color: 'inherit' }}> 
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
        <Button sx={{color: 'text.primary', ...alignButtons}}> 
          <Link to='/notifications' className={styles.imgBtn} style={{ color: 'inherit' }}>
            <InsertDriveFileOutlinedIcon/> 
            <span>Черновики</span>
          </Link>
        </Button>
      </Box>
      <Button variant='contained' className={styles.create}>
        <AddIcon/>
        Создать
      </Button>
    </div>


  );
};

export default NavBar;