import {FC, useContext} from 'react'
import { Link } from 'react-router-dom';
import {MyThemeContext} from '../../contexts/index.ts';
import { Input, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { meAPI } from '../../store/reducers/me.slice.ts';
import styles from "./styles.module.scss"
import MyAvatar from '../../components/MyAvatar.tsx';

const Header: FC = ({}) => {
  const {data: me} =  meAPI.useGetMeQuery()
  const {isDarkTheme, toggleTheme} = useContext(MyThemeContext)

  return (
      <Box 
        component="header"
        sx={{ bgcolor: 'primary.main' }}
        className={styles.header}
      >
        {me && (
          <>
            <Link to="/" className={styles.logo}>
                <Box sx={{ color: 'background.default'}}>
                  POSTOPIA
                </Box>
            </Link>

            <Box className={styles.searching} component='div' sx={{bgcolor: 'background.default'}}>
              <SearchIcon sx={{ width: 20, height: 20, color: 'text.primary', mr: '5px' }} />
              <Input placeholder='Поиск...'  className={styles.searching_input} />
            </Box>

            <div className={styles.settings}>
                {isDarkTheme
                  ? <DarkModeOutlinedIcon sx={{ width: 25, height: 25, color: 'white'}} onClick={() => toggleTheme()}/>
                  : <LightModeOutlinedIcon sx={{ width: 25, height: 25, color: 'white'}} onClick={() => toggleTheme()}/> }
                
                <Link to={`/user/:${me._id}`}>
                  <MyAvatar avatar={String(me?.avatar)} firstName={me?.firstName || ""}  sx={{ width: 27, height: 27}} />
                </Link>
            </div>
          </>
        )}
        </Box>
  );
};

export default Header;