import {FC, useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import Header from './Header/Header'
import { Box } from '@mui/material';
import NavBar from './NavBar/NavBar';
import { userAPI } from '../store/reducers/user.slice';

const Layout: FC = ({}) => {
  const navigate = useNavigate()
  const { data, isError, isLoading } = userAPI.useGetMeQuery()

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (!token) {
      navigate('/')
      return
    }
  
    // Ждём завершения запроса
    if (!isLoading) {
      if (isError) { // Токен невалидный
        localStorage.removeItem('token')
        navigate('/')
      } else { // Токен валидный
        navigate('/posts')
      }
    }
  }, [isLoading, isError]) // Зависим от статуса запроса
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