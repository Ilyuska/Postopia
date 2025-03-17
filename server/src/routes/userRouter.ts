import { Router} from "express"
import UserController from "../controllers/userController"
import { registrationValidator } from "../middlewares/registrationValidator";
import { authorizationValidator } from "../middlewares/authorizationValidator";

		
const userRouter = Router();

userRouter.post('/registration', registrationValidator, UserController.registration )
userRouter.post('/login', authorizationValidator, UserController.authorization) 
// userRouter.get('/me', UserController.getMe) 
// userRouter.put('/me', UserController.update) //редактирование профиля
// userRouter.delete('/me', UserController.delete)
// userRouter.get('/:id', UserController.getId)


export default userRouter