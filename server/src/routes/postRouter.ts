import { Router} from "express"
import PostController from "../controllers/postController"


        
const postRouter = Router();

// postRouter.post('/registration', registrationValidator, UserController.registration )
// postRouter.post('/login', authorizationValidator, UserController.authorization) 
// postRouter.get('/me', UserController.getMe) 
// postRouter.put('/me', UserController.update) //редактирование профиля
// postRouter.delete('/me', UserController.delete)
// postRouter.get('/:id', UserController.getId)


export default postRouter