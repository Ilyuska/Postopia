import { Router} from "express"
import PostController from "../controllers/postController"
import { isAuthorizated } from "../middlewares/isAuthorizated";


        
const postRouter = Router();

postRouter.get('/posts', PostController.getAll) 
postRouter.get('/post/:id', PostController.getById)

//Добавить валидацию поста
postRouter.post('/post', isAuthorizated , PostController.create )

//Добавить вместо isAuth проверку чей пост.
postRouter.patch('/post/:id', isAuthorizated, PostController.update) 
postRouter.delete('/post/:id', isAuthorizated, PostController.delete)
postRouter.patch('/post/:id/like', isAuthorizated, PostController.like)

export default postRouter