import { Request, Response } from 'express';
import UserService from '../services/userService';

class UserController {
    async registration (req: Request, res: Response) {
        try {
            const {name, email, password} = req.body
            if (!email || !password || !name) {
                return res.status(400).json({ message: 'email, имя и пароль обязательны' });
            }
            
            const user = await UserService.registration(req.body)
            res.json(user)
        } catch (e) {
            console.error('Ошибка при регистрации:', e);
            res.status(500).json({message: 'Проблема с регистрацией', e})
        }
    }

//     async authorization (req: Request, res: Response) {
//         try {
//             const user = await UserService.
//         } catch (error) {
            
//         }
//     }
    
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