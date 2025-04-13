import { Router} from "express"
import PostController from "../controllers/postController"
import { isAuthorizated } from "../middlewares/isAuthorizated";
import { upload } from "../middlewares/setupMulter";


const postRouter = Router();

postRouter.get('/', PostController.getAll) 
postRouter.get('/:id', PostController.getById)

//Добавить валидацию поста
postRouter.post('/', isAuthorizated , upload.single('image'), PostController.create )

//Добавить вместо isAuth проверку чей пост.
postRouter.patch('/:id', isAuthorizated, upload.single('image'), PostController.update) 
postRouter.delete('/:id', isAuthorizated, PostController.delete)
postRouter.patch('/:id/like', isAuthorizated, PostController.like)

export default postRouter