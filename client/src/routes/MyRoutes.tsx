import {FC} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from '../layouts/Layout';
import Home from '../pages/Home';
import Posts from '../pages/Posts/Posts';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import Favorites from '../pages/Favorites';



const MyRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="profile" element={<Profile />} />
          <Route path='favorites' element={<Favorites />}/>
          <Route path='notifications' element={<Notifications />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;