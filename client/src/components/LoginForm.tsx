import {FC, useState, useContext} from 'react'
import { AuthContext } from '../contexts';
import { loginAPI } from '../api/mainAPI';
import { ILoginData } from '../interfaces/IUser';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const LoginForm: FC = () => {
  const {login} = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginData>({email: "", password: ""})
  const [loginError, setLoginError] = useState<ILoginData>({email: "", password:""})

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setLoginError({email: "", password:""})
  };

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
      handleClose();
    }
  };


  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen} sx={{color: '#ffffff', borderColor: '#ffffff'}}>
        Log in
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component ='form'
        onSubmit= {handleSubmit}
      >
        <DialogTitle sx={{textAlign: 'center'}} >
          Log In
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
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            error = {!!loginError.email}
            helperText={loginError.email}
            onChange={(e)=>setLoginData({...loginData, email: e.target.value})}
          />
          <TextField
            autoFocus
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