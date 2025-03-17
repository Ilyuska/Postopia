import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
    async registration (req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password} = req.body           
            const user = await UserService.registration({name, email, password})
            res.status(201).json(user)
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            res.status(500).json({message: 'Ошибка с нашей стороны. Попробуйте позже', error})
        }
    }

    async authorization (req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body  
            const user = await UserService.authorization({email, password})
            res.json(user)
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            res.status(401).json({message: 'Неверный логин или пароль.', error})
        }
    }
    
//     async getMe (req: Request, res: Response) {
//         try {
//             const user = await UserService.
//         } catch (error) {  
            
//         }
//     }

//     async update (req: Request, res: Response) {  
//         try {
//             const user = await UserService.
//         } catch (error) {
            
//         }
//     }

//     async delete (req: Request, res: Response) {
//         try {
//             const user = await UserService.
//         } catch (error) {
            
//         }
//     }

//     async getId (req: Request, res: Response) {
//         try {
//             const user = await UserService.
//         } catch (error) {
            
//         }
//     }
}

export default new UserController();