import {FC, ReactNode, useState} from 'react'
import {Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ReorderIcon from '@mui/icons-material/Reorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import styles from './styles.module.scss'
import { Link, useNavigate } from 'react-router-dom';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';

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
            <Link to={linkTo}> {children}</Link>
       
      </Button>
  );
};


const Footer: FC = () => {
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
        
        <CustomButton linkTo='/drafts'> <InsertDriveFileOutlinedIcon sx={{color: 'background.default'}}/> </CustomButton>
        <CustomButton linkTo='/favorites'> <FavoriteIcon color='error'/> </CustomButton>
      </footer>
      <CreatePostForm isOpen = {isOpen} setIsOpen={onClick}/>
    </>
  );
};

export default Footer;