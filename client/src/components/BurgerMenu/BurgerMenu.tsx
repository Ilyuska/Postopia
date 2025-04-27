import {FC, useContext} from 'react'
import styles from './styles.module.scss'
import { Box, Button, ButtonGroup } from '@mui/material';
import { AuthContext } from '../../contexts';
import { Link } from 'react-router-dom';

interface IBurgerMenu {
    status: boolean, 
    setStatus: () => void
} 

const stylesBurger = {
    display: 'flex', backgroundColor: 'background.paper', border: '1px solid', borderColor: 'primary.main', borderRadius: '10px'
}

const BurgerMenu: FC<IBurgerMenu> = ({status, setStatus}) => {
    const {logout} = useContext(AuthContext)

  return (
    <>
        <Box className={styles.background} sx={!status? {display: 'none'}: {display: 'block'}} onClick = {()=> setStatus()}></Box>
        <Box className={styles.burger} sx={!status? {display: 'none'}: {...stylesBurger}} >
            <Link to='/me'>
                <Button sx={{color:'text.primary', width: '100%'}} onClick = {()=> setStatus()}>Profile</Button>
            </Link>
            <Link to='/'>
                <Button variant='text' color='error' fullWidth onClick={() => {setStatus(); logout()}}>Log out</Button>
            </Link>
           
        </Box>
    </>
    
  );
};

export default BurgerMenu;