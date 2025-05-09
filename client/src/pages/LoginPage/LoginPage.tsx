import {FC, useState, useEffect, FormEvent} from 'react'
import { useNavigate } from 'react-router-dom';
import { ILoginData, ILoginError } from '../../interfaces/IUser';
import { Button, TextField, FormLabel, FormGroup, Box } from '@mui/material';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './style.module.scss'
import { userAPI } from '../../store/reducers/user.slice';


const LoginPage: FC = () => {
  const navigate = useNavigate()
  useEffect(()=> {if (localStorage.getItem('token')) navigate('/posts')}, [navigate])

  const [login] = userAPI.useLoginMutation();
  
  const [loginData, setLoginData] = useState<ILoginData>({email: '', password: ''})
  const [loginError, setLoginError] = useState<ILoginData>({email: '', password: ''})

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const user = await login(loginData).unwrap();
      localStorage.setItem('token', user.token);
      navigate('/posts')
    } catch (error) {
       console.log(error)
       const customError = error as ILoginError
       setLoginError({...customError.data})
    }
  }
  

  return (
      <Box
        component='form'
        onSubmit= {handleSubmit}
        sx={{bgcolor: 'secondary.main', p: '20px'}}
        className={styles.form}
      >
        <FormLabel className={styles.label} >
          Log In
        </FormLabel>
        <FormGroup>
          <TextField
            autoFocus
            required
            margin="dense"
            name = 'password'
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            error = {!!loginError.email}
            helperText={loginError.email}
            onChange={(e)=>{
              setLoginData({...loginData, email: e.target.value})
              setLoginError({...loginError, email: ''})
            }}
          />
          <TextField
            required
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            error={!!loginError.password}
            helperText={loginError.password}
            variant="standard"
            onChange={(e)=>{
              setLoginData({...loginData, password: e.target.value})
              setLoginError({...loginError, password: ''})
            }}
          />
        </FormGroup>
        <Box>
            <Button type="submit" sx= {{backgroundColor: 'primary.main', color: 'background.default', width: '100%'}}>Login</Button>
            <RegistrationForm/>
        </Box>
      </Box>
    
  );
};

export default LoginPage;