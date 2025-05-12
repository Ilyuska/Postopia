import {FC, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import {MyThemeContext} from '../../contexts/index.ts';
import { Avatar, Input, Box, Button, ButtonGroup } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import BurgerMenu from '../BurgerMenu/BurgerMenu.tsx';
import { userAPI } from '../../store/reducers/user.slice.ts';
import styles from "./styles.module.scss"

const Header: FC = ({}) => {
  const {data: me} =  userAPI.useGetMeQuery()
  const {isDarkTheme, toggleTheme} = useContext(MyThemeContext)
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false)

  const burgerSwitch = () => setBurgerOpen(!burgerOpen)

  return (
      <Box 
        component="header"
        sx={{ bgcolor: 'primary.main' }}
        className={styles.header}
      >
       <Link to="/" className={styles.logo}>
          <Box sx={{ color: 'background.default'}}>
            POSTOPIA
          </Box>
        </Link>

        {me && (
          <Box className={styles.searching} component='div' sx={{bgcolor: 'background.default'}}>
            <SearchIcon sx={{ width: 20, height: 20, color: 'text.primary', mr: '5px' }} />
            <Input placeholder='Поиск...'  className={styles.searching_input} />
          </Box>)}
       

        <div className={styles.settings}>
            {isDarkTheme
              ? <DarkModeOutlinedIcon sx={{ width: 25, height: 25, color: 'white'}} onClick={() => toggleTheme()}/>
              : <LightModeOutlinedIcon sx={{ width: 25, height: 25, color: 'white'}} onClick={() => toggleTheme()}/> }


          {me && (
            <>
              <Avatar onClick={burgerSwitch} src={`http://localhost:3000/uploads/${me?.avatar}`} sx={{ width: 27, height: 27}} >
                {!me?.avatar && <PersonIcon />}               
              </Avatar>
              <BurgerMenu status = {burgerOpen} setStatus={burgerSwitch}/>
            </>
          )}
        </div>
        
        </Box>
  );
};

export default Header;