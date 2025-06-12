import {FC, ReactNode, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Avatar, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import ReorderIcon from '@mui/icons-material/Reorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import { meAPI } from '../../store/reducers/me.slice';
import styles from './styles.module.scss'
import MyAvatar from '../../components/MyAvatar';

interface CustomButtonProps {
  children: ReactNode;
  linkTo: string
}

const CustomButton: FC<CustomButtonProps> = ({ children, linkTo }) => {
  const navigate = useNavigate()
  return (
      <Button 
        className={styles.button_others} 
        sx={{ bgcolor: 'primary.main', borderTop: 2, borderColor: 'background.default'}} 
        variant="outlined"
        onClick={() => navigate(linkTo)}
      >
            {children}
       
      </Button>
  );
};


const Footer: FC = () => {
  const {data: me} =  meAPI.useGetMeQuery()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const onClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <footer className={styles.footer} >
        <CustomButton linkTo='/posts'> <ReorderIcon sx={{color: 'background.default'}}/> </CustomButton>
        <CustomButton linkTo='/notifications'> <NotificationsNoneIcon sx={{color: 'background.default'}}/> </CustomButton>
        <Button className={styles.button_add} sx={{ bgcolor: 'primary.main', borderTop: 2, borderColor: 'background.default'}} variant='outlined' onClick={onClick}>
          <AddIcon sx={{color: 'background.default'}}/>
        </Button>
        <CustomButton linkTo='/favorites'> <FavoriteIcon color='error'/> </CustomButton>
        <CustomButton linkTo={`/user/:${me?._id}`}> 
          <MyAvatar avatar={String(me?.avatar)} firstName={me?.firstName || ""}  sx={{ width: 25, height: 25}} />
        </CustomButton>
      </footer>
      <CreatePostForm isOpen = {isOpen} setIsOpen={onClick}/>
    </>
  );
};

export default Footer;