import {FC} from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header/Header'
import { Box } from '@mui/material';
import NavBar from './NavBar/NavBar';

const Layout: FC = ({}) => {
  return (
    <>
        <Header/>
        <NavBar />
        <Box component='div' sx={{padding: '85px 18vw 0 300px;', bgcolor: 'background.default', minHeight: '100vh'}}>
          <Outlet />
        </Box>
    </>
  );
};

export default Layout;