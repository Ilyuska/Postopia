import { Router} from "express"
import PostController from "../controllers/postController"
import { isAuthorizated } from "../middlewares/isAuthorizated";


        
const postRouter = Router();

postRouter.get('/', PostController.getAll) 
postRouter.get('/:id', PostController.getById)

//Добавить валидацию поста
postRouter.post('/', isAuthorizated , PostController.create )

//Добавить вместо isAuth проверку чей пост.
postRouter.patch('/:id', isAuthorizated, PostController.update) 
postRouter.delete('/:id', isAuthorizated, PostController.delete)
postRouter.patch('/:id/like', isAuthorizated, PostController.like)

export default postRouter