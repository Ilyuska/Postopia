import { Router} from "express"
import CommentController from "../controllers/postController"
import { isAuthorizated } from "../middlewares/isAuthorizated";
import { isValidComment } from "../middlewares/isValidComment";


const commentRouter = Router();

commentRouter.get('/', isAuthorizated, CommentController.getAll) 

commentRouter.post('/', isAuthorizated, isValidComment, CommentController.create )

//Добавить вместо isAuth проверку чей коммент.
commentRouter.patch('/:commentId', isAuthorizated, isValidComment, CommentController.update) //Сделать проверку на то мой ли пост
commentRouter.delete('/:commentId', isAuthorizated, CommentController.delete) //Сделать проверку на то мой ли пост

export default commentRouter