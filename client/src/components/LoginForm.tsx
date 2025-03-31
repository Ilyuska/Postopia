import {FC, useState, useContext} from 'react'
import { AuthContext } from '../contexts';
import { loginAPI } from '../api/mainAPI';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';

interface ILoginForm {
  email: string,
  password: string
}

const LoginForm: FC = ({}) => {
  const {login} = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginForm>({email: "", password: ""})
  const [loginError, setLoginError] = useState<ILoginForm>({email: "", password:""})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginError({email: "", password:""})
  };

  const handleLoginData = (email: string, password: string) => {
    email.length>0 ? setLoginData({...loginData, email}): setLoginData({...loginData, password})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loginData.password.length < 6) {
      setLoginError({ email: "", password: "Минимум 6 символов" });
      return;
    }

    const token = await loginAPI(loginData);
    if (token=="Неверные данные") {
      setLoginError({ email: "Неверные данные", password: "Неверные данные" })
    } else {
      login(token);
      handleClose();
    }
  };


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component ='form'
        onSubmit= {handleSubmit}
      >
        <DialogTitle sx={{textAlign: 'center'}} >
          Login
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            error = {!!loginError.email}
            helperText={loginError.email}
            onChange={(e)=>handleLoginData(e.target.value, "")}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            error={!!loginError.password}
            helperText={loginError.password}
            variant="standard"
            onChange={(e)=>handleLoginData("", e.target.value)}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Login</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;