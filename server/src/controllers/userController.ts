import { Request, Response } from 'express';
import { Types } from 'mongoose';
import UserService from '../services/userService';


function AuthError (error, res: Response): void {
    if (error instanceof Error) {
        if (error.message === "Такой пользователь уже существует") {
            res.status(400).json({ message: error.message });
            return;
        }

        if (error.message === "Неверный логин или пароль") {
            res.status(401).json({ message: error.message });
            return;
        }

        if (error.message === "Пользователь не найден") {
            res.status(404).json({message: error.message})
            return;
        }
        
    }
    res.status(500).json({
        message: 'Ошибка с нашей стороны. Попробуйте позже',
    });
}


class UserController {
    async registration (req: Request, res: Response): Promise<void> {
        try {
            const {name, email, password} = req.body
            const avatar = req.file ? `${req.file.filename}` : undefined;
            if (avatar == undefined) console.error('photo??')    
            const user = await UserService.registration({name, email, password, avatar})
            res.status(201).json(user)
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            AuthError(error, res)
        }
    }


    async authorization (req: Request, res: Response): Promise<void> {
        try {
            const {email, password} = req.body  
            const user = await UserService.authorization({email, password})
            res.json(user)
        } catch (error) {
            console.error('Ошибка при авторизации:', error);
            AuthError(error, res)
        }
    }


    async getById (req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const user = await UserService.getById(id)
            res.status(200).json(user)
        } catch (error) {
            console.error('Пользователь не найден:', error);
            AuthError(error, res)
        }
    }
   
    
    async getMe (req: Request, res: Response) {
        try {
            if (req.userId) {
                const user = await UserService.getMe(req.userId)
                res.status(200).json(user)
            } else {
                res.status(401).json('Пользователь не авторизован')
            }
            
        } catch (error) {  
            console.error('Пользователь не найден:', error);
            AuthError(error, res)
        }
    }


    async update (req: Request, res: Response) {  
        try {
            if (req.userId) {
                const {name} = req.body
                const avatar = req.file ? `/avatars/${req.file.filename}` : undefined;
                const user = await UserService.update(req.userId, {name, avatar})
                res.status(200).json(user)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error('Пользователь не найден:', error);
            AuthError(error, res)
        }
    }


    async delete (req: Request, res: Response) {
        try {
            if (req.userId) {
                const message = await UserService.delete(req.userId)
                res.status(200).json(message)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }   
        } catch (error) {
            console.error('Пользователь не найден:', error);
            AuthError(error, res)
        }
    }
}

export default new UserController();