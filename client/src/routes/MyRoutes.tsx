import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Posts from '../pages/Posts/Posts';
import Notifications from '../pages/Notifications';
import Favorites from '../pages/Favorites';
import Drafts from '../pages/Drafts';
import LoginPage from '../pages/LoginPage/LoginPage';
import Loading from '../components/Loading/Loading';
import PostPage from '../pages/PostPage/PostPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import MyProfile from '../pages/MyProfile/MyProfile';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
// import Post from '../components/Post/Post';



const MyRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="posts" element={<Posts />} />
          <Route path='post/:id' element = {<PostPage/>} /> 
          <Route path="me" element={<MyProfile />} />
          <Route path="user/:id" element={<ProfilePage />} />
          <Route path='favorites' element={<Favorites />}/>
          <Route path='notifications' element={<Notifications />}/>
          <Route path='drafts' element={<Drafts />}/>
          <Route path='loading' element={<Loading />}/>
          <Route path='*' element={<NotFoundPage />}/>
        </Route>
      </Routes>
  );
};

export default MyRoutes;