import {FC, useState} from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.scss'


const CreatePostForm: FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleClose = () => setIsOpen(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        setIsOpen(false)
    }

    return (
        <>
            <Button variant='contained' className={styles.create} onClick={()=>setIsOpen(true)}>
                <AddIcon/>
                Создать 
            </Button>
            <Dialog open={isOpen} onClose={handleClose} component ='form' onSubmit= {(e) => handleSubmit(e)}>
                <DialogTitle sx={{textAlign: 'center'}} >
                    Creating Post
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
                        label='Post Title'
                        type="text"
                        fullWidth
                        variant="outlined"
                        // error = {!!loginError.email}
                        // helperText={loginError.email}
                        // onChange={(e)=>setLoginData({...loginData, email: e.target.value})}
                        className={styles.title}
                    />
                    <TextField
                        label="Post Message"
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                        variant="outlined"
                        multiline  // Включает многострочный режим
                        minRows={1} 
                        maxRows={10}
                        required
                        // error={!!loginError.password}
                        // helperText={loginError.password}
                        // onChange={(e)=>setLoginData({...loginData, password: e.target.value})}
                        className={styles.message}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
  );
};

export default CreatePostForm;