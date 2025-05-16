import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Posts from '../pages/Posts/Posts';
import Notifications from '../pages/Notifications';
import Favorites from '../pages/Favorites';
import LoginPage from '../pages/LoginPage/LoginPage';
import Loading from '../components/Loading/Loading';
import PostPage from '../pages/PostPage/PostPage';
import Profile from '../pages/Profile/Profile';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';


const MyRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="posts" element={<Posts />} />
          <Route path='posts/:id' element = {<PostPage/>} /> 
          <Route path="user/:id" element={<Profile />} />
          <Route path='favorites' element={<Favorites />}/>
          <Route path='notifications' element={<Notifications />}/>
          <Route path='loading' element={<Loading />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
  );
};

export default MyRoutes;