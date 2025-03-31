import {FC, useContext} from 'react'
import { Link } from 'react-router-dom';
import { Avatar, Input, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import {AuthContext} from '../../contexts/index.ts';
import LoginForm from '../../components/LoginForm.tsx';
import style from "./style.module.scss"

const Header: FC = ({}) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <header className={style.header}>
       <Link to="/">Postopia</Link>
       <div className={style.searching}>
          <Input/>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <SearchIcon sx={{ width: 30, height: 30 }} />
          </Box>
        </div>
        {isAuth ? (
          <Avatar>
            <PersonIcon />
          </Avatar>
        ) : (
          <LoginForm />
        )}
    </header>
  );
};

export default Header;