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
        <Box component='div' sx={{padding: '0 10vw 0 300px;', bgcolor: 'background.default', minHeight: '100vh', paddingTop: '65px'}}>
          <Outlet />
        </Box>
    </>
  );
};

export default Layout;