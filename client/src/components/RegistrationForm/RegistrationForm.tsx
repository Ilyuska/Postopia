import {ChangeEvent, FC, useState} from 'react'
import { IRegisterData, IRegisterError } from '../../interfaces/IUser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton } from '@mui/material';
import styles from "./style.module.scss"
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../../store/reducers/user.slice';
import InputFile from '../InputFile/InputFile';


const RegistrationForm: FC = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<IRegisterData>({email: "", password: "", firstName: "", lastName: "", birthday: ""})
  const [registerError, setRegisterError] = useState<IRegisterData>({email: "", password: "", firstName: "", lastName: "", birthday:""})

  const [registration] = userAPI.useRegistrationMutation();

  const handleClose = () => {
    setOpen(false);
    setRegisterError({email: "", password: "", firstName: "", lastName: "", birthday: ""})
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setRegisterData({...registerData, avatar: e.target.files[0]});
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await registration(registerData).unwrap();
      localStorage.setItem('token', user.token);
      navigate('/posts')
    } catch (error) {
      console.log(error)
      const customError = error as IRegisterError
      setRegisterError({...customError.data})
    }
  };


  const getMaxDate = ():string => {
    const today = new Date();
    const year = Number(today.getFullYear())-13;
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate() + 1).padStart(2, "0");
    return `${String(year)}-${month}-${day}`;
  };


  return (
    <>
      <Button variant="text" onClick={()=> setOpen(true)} sx= {{backgroundColor: 'none', color: 'black', display: 'block', fontSize: '12px', mx: 'auto'}}>
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
            <InputFile onChange = {handleFileChange} styles=' '/>
            <TextField
              autoFocus
              required
              margin="dense"
              name="firstname"
              label="Firstname"
              fullWidth
              variant="standard"
              error = {Boolean(registerError.firstName)}
              helperText={registerError.firstName}
              onChange={(e)=>setRegisterData({...registerData, firstName: e.target.value})}
              />
            <TextField
              required
              margin="dense"
              name="lastname"
              label="Lastname"
              fullWidth
              variant="standard"
              error = {Boolean(registerError.lastName)}
              helperText={registerError.lastName}
              onChange={(e)=>setRegisterData({...registerData, lastName: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              name="birthday"
              label="Birthday"
              type="date"
              fullWidth
              variant="standard"
              error = {Boolean(registerError.birthday)}
              helperText={registerError.birthday}
              onChange={(e)=>setRegisterData({...registerData, birthday: e.target.value})}
              slotProps={{ 
                inputLabel: { 
                  shrink: true 
                }, 
                htmlInput: {
                  max: getMaxDate(), 
                  min: '1990-01-01'
                } 
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
              error = {Boolean(registerError.email)}
              helperText={registerError.email}
              onChange={(e)=>setRegisterData({...registerData, email: e.target.value})}
            />
            <TextField
              required
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              error={Boolean(registerError.password)}
              helperText={registerError.password}
              variant="standard"
              onChange={(e)=>setRegisterData({...registerData, password: e.target.value})}
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