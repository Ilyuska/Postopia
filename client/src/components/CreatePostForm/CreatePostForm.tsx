import {FC, useState, ChangeEvent} from 'react'
import { Button, TextField, Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.scss'
import { postAPI } from '../../store/reducers/posts.slice';

interface PostData {
  title: string;
  message: string;
  image: File | null;
}

const CreatePostForm: FC = () => {
    const [createPost] = postAPI.useCreatePostMutation() //Создание поста
    const [isOpen, setIsOpen] = useState(false)
    const [newPost, setNewPost] = useState<PostData>({
      title: '', 
      message: '', 
      image: null
    })

    const [postError, setPostError] = useState<PostData>({title: "", message: "", image: null})


    const handleClose = () => {
      setIsOpen(false)
      setNewPost({title: '', message: '', image: null})
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setNewPost({...newPost, image: e.target.files[0]});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if  (newPost.title.length < 4) {
            setPostError({...postError, title: "Минимальная длинна заголовка 4"})
            return;
        }
        setPostError({...postError, title: ""})
        if (newPost.message.length < 10) {
            setPostError({...postError, message: "Минимальная длина поста 10"})
            return;
        }
        setPostError({...postError, message: ""})
        try {
          await createPost(newPost)
          handleClose();
        } catch (error) {
          alert('Не удалось создать пост')
        }   
    }

    return (
        <>
            <Button 
                variant='contained' 
                className={styles.create} 
                onClick={() => setIsOpen(true)}
            >
                <AddIcon/>
                Create Post
            </Button>
            
            <Dialog 
              open={isOpen} 
              onClose={handleClose}
            >
              <form 
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                action="/posts"
                
              >
                <DialogTitle sx={{textAlign: 'center'}}>
                    Create New Post
                </DialogTitle>
                <IconButton
                  aria-label="close"
                  onClick={handleClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>

                <TextField
                    margin="dense"
                    type="file"
                    fullWidth
                    variant="outlined"
                    name='image'
                    
                    onChange={handleFileChange}
                />
                <TextField
                    autoFocus
                    required
                    margin="dense" //Надо ли??
                    label='Post Title'
                    name= "title"
                    type="text"
                    variant="outlined"
                    value={newPost.title}
                    error = {postError.title.length>0}
                    helperText={postError.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    className={styles.title}
                />
                <TextField
                    required
                    margin="dense"
                    label="Post Message"
                    name = "message" 
                    type="text"
                    variant="outlined"
                    multiline
                    minRows={4}
                    value={newPost.message}
                    error = {postError.message.length>0}
                    helperText={postError.message}
                    onChange={(e) => setNewPost({...newPost, message: e.target.value})}
                    className={styles.message}
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Create</Button>
                </DialogActions>
              </form>
            </Dialog>
        </>
    );
};

export default CreatePostForm;