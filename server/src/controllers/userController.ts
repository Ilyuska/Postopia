import { NextFunction, Request, Response } from 'express';
import UserService from '../services/userService';
import { AppError, UnauthorizedError } from '../models/Error';


class UserController {
    async registration (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, firstName, lastName, birthday, password} = req.body
            const avatar = req.file?.filename || '';

            const user = await UserService.registration({email, firstName, lastName, birthday, password, avatar})
            res.status(201).json(user)
        } catch (err){
            next(err)
        }
    }


    async authorization  (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {email, password} = req.body  
            const user = await UserService.authorization({email, password})
            res.json(user)
        } catch (err) {
            next(err)
        }
    }


    async getById  (req: Request, res: Response, next: NextFunction) {
        try {
            const user = await UserService.getById(req.params.id)
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
   
    
    async getMe  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const user = await UserService.getMe(req.userId)
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }


    async update  (req: Request, res: Response, next: NextFunction) {  
        try {
            if (!req.userId) throw new UnauthorizedError()
            const {firstName, lastName, birthday} = req.body
            const avatar = req.file ? `/avatars/${req.file.filename}` : undefined;
            const user = await UserService.update(req.userId, {firstName, lastName, birthday, avatar})
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }


    async delete  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            await UserService.delete(req.userId)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }
}

export default new UserController();