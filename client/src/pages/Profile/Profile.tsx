import {FC, useEffect, useState} from 'react'
import { IUser } from '../../interfaces/IUser';
import { getMe } from '../../api/mainAPI';
import { Avatar, Box, Button, Card, TextField } from '@mui/material';
import styles from './styles.module.scss'

const Profile: FC = () => {  

  const [me, setMe] = useState<IUser>()
  
    useEffect(()=> { 
      const fetchPosts = async () => {
        try {
          const data = await getMe()
          if (data) {
            setMe(data);
          } else {
            console.error('Не удалось загрузить посты');
          }
        } catch (error) {
          console.error(error)
        }
      }
  
      fetchPosts()
    },[])

  return (
    <>
      <Card sx={{color: 'text.primary', p: '30px'}}>
        <Box sx={{display: 'flex', gap: '30px', height:'200px',}}>     
          <Avatar sx={{width: '200px', height:'200px'}}></Avatar>
          <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
            <TextField type='text' title='name'  required label='Name' value={me?.name || ' '}/>
            <TextField type='email' title='email' label='Email' required/>
            <Box sx={{display: 'flex', justifyContent: 'end', gap: '20px'}}>
              <Button variant='outlined'>Save</Button>
              <Button variant='outlined' color='error'>Cancel</Button>
            </Box>
          </Box>
        </Box>
      </Card>

      <Box sx={{mt: '30px', height: '100vh'}}>
        <Box component={'h2'} sx={{color: 'text.primary'}} className={styles.title}>POSTS</Box>
        <Box>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum ipsum, delectus eveniet deleniti non pariatur dolorum velit cumque dolores. Adipisci, voluptate sapiente earum explicabo eius magnam ad suscipit corrupti necessitatibus!
        </Box>
      </Box>
    </>
  );
};

export default Profile;  