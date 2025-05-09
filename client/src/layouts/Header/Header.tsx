import {FC, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import {MyThemeContext} from '../../contexts/index.ts';
import { Avatar, Input, Box, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import style from "./style.module.scss"
import BurgerMenu from '../../components/BurgerMenu/BurgerMenu.tsx';
import { userAPI } from '../../store/reducers/user.slice.ts';

const Header: FC = ({}) => {
  const {data: me} =  userAPI.useGetMeQuery()
  const {isDarkTheme, toggleTheme} = useContext(MyThemeContext)
  const [burgerOpen, setBurgerOpen] = useState<boolean>(false)

  const burgerSwitch = () => setBurgerOpen(!burgerOpen)

  return (
      <Box 
        component="header"
        sx={{ bgcolor: 'primary.main' }}
        className={style.header}
      >
       <Link to="/" className={style.logo}>
          <Box sx={{ color: 'background.default' }}>
            POSTOPIA
          </Box>
        </Link>
        {me && (
          <Box className={style.searching} component='div' sx={{bgcolor: 'background.default'}}>
            <Input placeholder='Поиск'  sx={{width: '100%'}}/>
            <Box sx={{ display: 'flex', justifyContent: 'center' }} >
              <SearchIcon sx={{ width: 27, height: 27, color: 'text.primary' }} />
            </Box>
          </Box>)}
       

        <div className={style.settings}>
          <Button sx={{color: 'white'}} onClick={() => toggleTheme()}> {isDarkTheme?  <DarkModeOutlinedIcon/>: <LightModeOutlinedIcon/> }</Button>
          {me && (
            <>
              <Avatar onClick={burgerSwitch} src={`http://localhost:3000/uploads/${me?.avatar}`} >
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