import {FC} from 'react'
import { Avatar, Box, Button, Card, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './styles.module.scss'
import { userAPI } from '../../store/reducers/user.slice';
import Loading from '../../components/Loading/Loading';
import Post from '../../components/Post/Post';

const MyProfile: FC = () => {  
  const {data: me, error, isLoading} =  userAPI.useGetMeQuery()
  console.log(me)

  return (
    <>
      {isLoading && <Loading/>}
      {error && <Box sx={{color: 'text.primary'}}>Ошибка, подробности в консоли</Box>}
      {me && (
       <>
        <Card sx={{color: 'text.primary', p: '30px'}}>
          <Box sx={{display: 'flex', gap: '30px', height:'200px',}}>     
              <Avatar 
                src={`http://localhost:3000/uploads/${me?.avatar}`} 
                sx={{width: '200px', height: '200px'}}>
                {!me?.avatar && <PersonIcon />}               
              </Avatar>
            
            <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
              <TextField type='text' title='name'  required label='Name' value={me?.name || ' '}/>
              <TextField type='email' title='email' label='Email' value={me?.email || ' '}/>
              <Box sx={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
                <Button variant='outlined'>Save</Button>
                <Button variant='outlined' color='error'>Cancel</Button>
              </Box>
            </Box>
          </Box>
        </Card>

        <Box sx={{mt: '30px', height: '100vh'}}>
          <Box component={'h2'} sx={{color: 'text.primary'}} className={styles.title}>POSTS</Box>
          {me.posts.length > 0 
            ? me.posts.map(post => (
              <Post post={{...post, liked:post.likes.some(like => like === me._id), user: {avatar: me.avatar, name: me.name, email: me.email, _id: me._id}}} key={post._id} />
            ))
            : (<Box sx={{color: 'text.primary'}}>Постов нет</Box>)}
        </Box>
       </>
      )}
        
      
    </>
  );
};

export default MyProfile;  