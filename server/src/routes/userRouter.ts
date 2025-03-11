import { Router} from "express"
import UserController from "../controllers/userController"

		
const userRouter = Router();

userRouter.post('/registration', <any> UserController.registration)
// userRouter.post('/authorization', UserController.authorization) 
// userRouter.get('/me', UserController.getMe) 
// userRouter.put('/me', UserController.update) //редактирование постов
// userRouter.delete('/me', UserController.delete)
// userRouter.get('/:id', UserController.getId)


export default userRouter