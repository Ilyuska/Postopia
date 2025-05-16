import {FC, useEffect} from 'react'
import { Avatar, Box, Card } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './styles.module.scss'
import { userAPI } from '../../store/reducers/user.slice';
import Loading from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';

const Profile: FC = () => {  
  const {data: user, error, isLoading} =  userAPI.useGetMeQuery()

  

  useEffect ( () => {
    const date = new Date
    console.log(`${date.getDate()}.${ date.getMonth()+1<10 ? `0${ date.getMonth()+1}` :  date.getMonth()+1}.${date.getFullYear()}`)
  }, [])

 
  

  return (
    <>
      {isLoading && <Loading/>}
      {error && <Box sx={{color: 'text.primary'}}>Ошибка, подробности в консоли</Box>}
      {user && (
       <>
        <Card sx={{color: 'text.primary', p: '15px'}}>
          <Box sx={{display: 'flex', gap: '30px'}}>     
              <Avatar 
                src={`http://localhost:3000/uploads/${user.avatar}`} 
                sx={{width: '100px', height: '100px'}}>
                {!user.avatar && <PersonIcon />}               
              </Avatar>
              <Box>
                <Box>{user.firstName} {user.lastName}</Box>
                <Box>{user.birthday}</Box>
              </Box>
          </Box>
        </Card>

        <Box sx={{mt: '30px'}}>
          <Box component={'h2'} sx={{color: 'text.primary', borderBottom: 2, borderColor: 'text.primary'}} className={styles.title}>POSTS</Box>
          <Box sx={{backgroundColor: 'background.paper'}}>
            {user.posts.length > 0 
              ? user.posts.map(post => (
                <Post post={{...post, liked:post.likes.some(like => like === user._id), user}} key={post._id} />
              ))
              : (<Box sx={{color: 'text.primary'}}>Постов нет</Box>)
            }
          </Box>
        </Box>
       </>
      )}
    </>
  );
};

export default Profile;  