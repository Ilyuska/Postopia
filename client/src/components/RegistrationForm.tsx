import {FC, useState, useContext} from 'react'
import { AuthContext } from '../contexts';
import { registrationAPI } from '../api/mainAPI';
import { IRegisterData } from '../interfaces/IUser';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';


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
      <Button variant="outlined" onClick={handleOpen} sx={{color: '#ffffff', borderColor: '#ffffff'}}>
        Sign up
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        component ='form'
        onSubmit= {handleSubmit}
      >
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
          />
          <TextField
            autoFocus
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
          />
          <TextField
            autoFocus
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
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Sign Up</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RegistrationForm;