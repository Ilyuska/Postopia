import {FC, useEffect, useMemo, useState} from 'react'
import { Avatar, Box, Card } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { meAPI } from '../../store/reducers/me.slice';
import Post from '../../components/Post/Post';
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom';
import { userAPI } from '../../store/reducers/user.slice';
import MyAvatar from '../../components/MyAvatar';

const Profile: FC = () => {  
  const location = useLocation();
  const userId = location.pathname.split('/:').pop() || '';

  const { data: me, error: meError } = meAPI.useGetMeQuery();

  const isMyProfile = useMemo(() => me?._id === userId, [me?._id, userId]);

  const { data: user, error: userError } = userAPI.useGetUserQuery(userId, {
    skip: isMyProfile || !userId, // не запрашиваем, если это мой профиль или нет ID
  });

  const profile = isMyProfile ? me : user;
  const profileError = isMyProfile ? meError : userError;


  useEffect ( () => {
    const date = new Date
    console.log(`${date.getDate()}.${ date.getMonth()+1<10 ? `0${ date.getMonth()+1}` :  date.getMonth()+1}.${date.getFullYear()}`)
  }, [])

 
  

  return (
    <>
      {meError && <Box sx={{color: 'text.primary'}}>Ошибка, подробности в консоли</Box>}
      {me && (
       <>
        <Card sx={{color: 'text.primary', p: '15px'}}>
          <Box sx={{display: 'flex', gap: '30px'}}>     
             <MyAvatar
              firstName={profile?.firstName ?? ""}
              avatar={profile?.avatar?.toString?.() ?? ""}
              sx={{ width: "100px", height: "100px" }}
            />
              <Box>
                <Box>{me.firstName} {me.lastName}</Box>
                <Box>{me.birthday}</Box>
              </Box>
          </Box>
        </Card>

        {/* <Box sx={{mt: '30px'}}>
          <Box component={'h2'} sx={{color: 'text.primary', borderBottom: 2, borderColor: 'text.primary'}} className={styles.title}>POSTS</Box>
          <Box sx={{backgroundColor: 'background.paper'}}>
            {me.posts.length > 0 
              ? me.posts.map(post => (
                <Post post={{...post, user: me}} key={post._id} />
              ))
              : (<Box sx={{color: 'text.primary'}}>Постов нет</Box>)
            }
          </Box>
        </Box> */}
       </>
      )}
    </>
  );
};

export default Profile;  