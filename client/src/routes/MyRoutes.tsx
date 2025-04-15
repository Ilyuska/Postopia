import {FC} from 'react'
import {Route, Routes} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Posts from '../pages/Posts/Posts';
import Profile from '../pages/Profile/Profile';
import Notifications from '../pages/Notifications';
import Favorites from '../pages/Favorites';
import Drafts from '../pages/Drafts';
import LoginPage from '../pages/LoginPage/LoginPage';
// import Post from '../components/Post/Post';



const MyRoutes: FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="posts" element={<Posts />} />
          {/* <Route path='post/:id' element = {<Post/>}> */}
          <Route path="profile" element={<Profile />} />
          <Route path='favorites' element={<Favorites />}/>
          <Route path='notifications' element={<Notifications />}/>
          <Route path='drafts' element={<Drafts />}/>
        </Route>
      </Routes>
  );
};

export default MyRoutes;