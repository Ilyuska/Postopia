import {FC, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import {AuthContext, MyThemeContext} from '../../contexts/index.ts';
import RegistrationForm from '../../components/RegistrationForm.tsx';
import LoginForm from '../../components/LoginForm.tsx';
import { Avatar, Input, Box, ButtonGroup, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import style from "./style.module.scss"
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu.tsx';

const Header: FC = ({}) => {
  const { isAuth } = useContext(AuthContext);
  const {isDarkTheme, toggleTheme} = useContext(MyThemeContext)
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false)

  const burgerSwitch = () => setBurgerOpen(!burgerOpen)

  return (
      <Box 
        component="header" // Можно указать любой тег: 'span', 'section' и т.д.
        sx={{ bgcolor: 'primary.main' }}
        className={style.header}
      >
       <Link to="/" className={style.logo}>
          <Box sx={{ color: 'background.default' }}>
            POSTOPIA
          </Box>
        </Link>
       <Box className={style.searching} component='div' sx={{bgcolor: 'background.default'}}>
          <Input placeholder='Поиск'  sx={{width: '100%'}}/>
          <Box sx={{ display: 'flex', justifyContent: 'center' }} >
            <SearchIcon sx={{ width: 27, height: 27, color: 'text.primary' }} />
          </Box>
        </Box>

        <div className={style.settings}>
          <Button sx={{color: 'white'}} onClick={() => toggleTheme()}> {isDarkTheme?  <DarkModeOutlinedIcon/>: <LightModeOutlinedIcon/> }</Button>
          {isAuth ? (
            <>
              <Avatar onClick={burgerSwitch}>
                <PersonIcon />
              </Avatar>
              <BurgerMenu status = {burgerOpen} setStatus={burgerSwitch}/>
            </>
          ) : (
            <ButtonGroup >
              <LoginForm />
              <RegistrationForm/>
            </ButtonGroup>
          )}
        </div>
        
        </Box>
  );
};

export default Header;