import {FC, useEffect} from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import Header from './Header/Header'
import { Box } from '@mui/material';
import NavBar from './NavBar/NavBar';
import { userAPI } from '../store/reducers/user.slice';
import styles from "./styles.module.scss"
import Footer from './Footer/Footer';

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
        <Box component='div' sx={{bgcolor: 'background.default', height: 'auto', minHeight: '100vh' }} className={styles.outlet}>
          <Outlet />
        </Box>
        <Footer/>
    </>
  );
};

export default Layout;