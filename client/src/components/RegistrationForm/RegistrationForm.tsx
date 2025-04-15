import {FC, useState, useContext} from 'react'
import { AuthContext } from '../../contexts';
import { registrationAPI } from '../../api/mainAPI';
import { IRegisterData } from '../../interfaces/IUser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton } from '@mui/material';
import styles from "./style.module.scss"


const RegistrationForm: FC = () => {
  const {login} = useContext(AuthContext)
  const [open, setOpen] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<IRegisterData>({email: "", password: "", name:""})
  const [registerError, setRegisterError] = useState<IRegisterData>({email: "", password: "", name:""})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRegisterError({email: "", password: "", name:""})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = await registrationAPI(registerData);
    if (token instanceof Object) {
      setRegisterError(token)
    } else {
      login(token);
      handleClose();
    }
  };


  return (
    <>
      <Button variant="text" onClick={handleOpen} sx= {{backgroundColor: 'none', color: 'background.default', display: 'block', fontSize: '12px', mx: 'auto'}}>
        Sign up
      </Button>
      { open &&
        (
        <Box  sx={{bgcolor: 'secondary.main', p: '20px'}} className={styles.form}>
          <DialogTitle sx={{textAlign: 'center'}} >
            Sign up
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
              name="name"
              label="Name"
              type="name"
              fullWidth
              variant="standard"
              error = {!!registerError.name}
              helperText={registerError.name}
              onChange={(e)=>setRegisterData({...registerData, name: e.target.value})}
              sx={{
                '& .MuiInputBase-input': { color: 'black' }, // Цвет текста
                '& .MuiInputLabel-root': { color: 'black' }, // Цвет лейбла
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Цвет лейбла при фокусе
              }}
            />
            <TextField
              required
              margin="dense"
              name="email"
              label="Email"
              type="email"
              fullWidth
              variant="standard"
              error = {!!registerError.email}
              helperText={registerError.email}
              onChange={(e)=>setRegisterData({...registerData, email: e.target.value})}
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
              error={!!registerError.password}
              helperText={registerError.password}
              variant="standard"
              onChange={(e)=>setRegisterData({...registerData, password: e.target.value})}
              sx={{
                '& .MuiInputBase-input': { color: 'black' }, // Цвет текста
                '& .MuiInputLabel-root': { color: 'black' }, // Цвет лейбла
                '& .MuiInputLabel-root.Mui-focused': { color: 'black' }, // Цвет лейбла при фокусе
              }}
            />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color='error'>Cancel</Button>
            <Button onClick={handleSubmit} sx={{color: 'black'}}>Sign Up</Button>
          </DialogActions>
        </Box>
        )}
      </>
  );
};

export default RegistrationForm;