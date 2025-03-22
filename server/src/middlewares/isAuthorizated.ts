import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные из .env

declare module 'express' {
    interface Request {
        userId?: Types.ObjectId;
    }
}

export const isAuthorizated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '') //Получаем либо пустую строку либо токен (без слова Bearer)

    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { _id: Types.ObjectId }; // Декодируем токен
            req.userId = decoded._id; // Используем как есть

            next() //Переходим к след функции
        } catch (e) {
            res.status(403).json({message: 'Пользователь не авторизирован'})
        }
    } else {
        res.status(403).json({message: 'Пользователь не авторизирован '})
    }
}