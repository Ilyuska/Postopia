import {FC} from 'react'
import {Outlet} from 'react-router-dom'
import Header from './Header/Header'
import { Box } from '@mui/material';

const Layout: FC = ({}) => {
  return (
    <>
        <Header/>
        <Box component='div' sx={{padding: '0 15vw', bgcolor: 'background.default', minHeight: '100vh'}}> {/* или любой другой отступ */}
          <Outlet />
        </Box>
    </>
  );
};

export default Layout;