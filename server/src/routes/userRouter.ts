import { Router} from "express"
import UserController from "../controllers/userController"
import { registrationValidator } from "../middlewares/registrationValidator";
import { authorizationValidator } from "../middlewares/authorizationValidator";
import { isAuthorizated } from "../middlewares/isAuthorizated";

		
const userRouter = Router();

userRouter.post('/registration', registrationValidator, UserController.registration )
userRouter.post('/login', authorizationValidator, UserController.authorization) 
userRouter.get('/user/:id', UserController.getById)
userRouter.get('/me', isAuthorizated, UserController.getMe) 
userRouter.patch('/me', isAuthorizated, UserController.update) //Редактирование моего аккаунта
userRouter.delete('/me', isAuthorizated, UserController.delete) //Удаление моего аккаунта



export default userRouter