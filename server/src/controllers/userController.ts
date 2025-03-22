import { Request, Response } from 'express';
import { ObjectId, Types } from 'mongoose';
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


    async getById (req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const user = await UserService.getById(id)
            res.status(200).json(user)
        } catch (error) {
            console.error('Пользователь не найден:', error);
            res.status(404).json({message: 'Пользователь не найден', error})
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
            res.status(404).json({message: 'Пользователь не найден', error})
        }
    }


    async update (req: Request, res: Response) {  
        try {
            if (req.userId) {
                const user = await UserService.update(req.userId, req.body)
                res.status(200).json(user)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error('Пользователь не найден:', error);
            res.status(404).json({message: 'Пользователь не найден', error})
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
            res.status(404).json({message: 'Пользователь не найден', error})
        }
    }
}

export default new UserController();