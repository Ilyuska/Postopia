import {FC, useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';
import { loginAPI } from '../../api/mainAPI';
import { ILoginData } from '../../interfaces/IUser';
import { Button, TextField, FormLabel, FormGroup, Box } from '@mui/material';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import styles from './style.module.scss'


const LoginPage: FC = () => {
  const navigate = useNavigate()
  useEffect(()=> {if (localStorage.getItem('token')) navigate('/posts')}, [])


  const {login} = useContext(AuthContext)
  const [loginData, setLoginData] = useState<ILoginData>({email: "", password: ""})
  const [loginError, setLoginError] = useState<ILoginData>({email: "", password:""})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.password.length < 6) {
      setLoginError({ email: "", password: "Минимум 6 символов" });
      return;
    }

    const token = await loginAPI(loginData);
    if (token instanceof Object) {
      setLoginError(token)
    } else {
      login(token);
      setLoginError({email: "", password:""})
    }
  };


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
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            error = {!!loginError.email}
            helperText={loginError.email}
            onChange={(e)=>setLoginData({...loginData, email: e.target.value})}
            sx={{
                '& .MuiInputBase-input': { color: 'black' }, // Цвет текста
                '& .MuiInputLabel-root': { color: 'black' }, // Цвет лейбла
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Цвет лейбла при фокусе
              }}
            
          />
          <TextField
            required
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            error={!!loginError.password}
            helperText={loginError.password}
            variant="standard"
            onChange={(e)=>setLoginData({...loginData, password: e.target.value})}
            sx={{
                '& .MuiInputBase-input': { color: 'black' }, // Цвет текста
                '& .MuiInputLabel-root': { color: 'black' }, // Цвет лейбла
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Цвет лейбла при фокусе
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