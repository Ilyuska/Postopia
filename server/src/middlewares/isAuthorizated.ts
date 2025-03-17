import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные из .env

declare module 'express' {
    interface Request {
        userId?: string;
    }
}

export const isAuthorizated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '') //Получаем либо пустую строку либо токен (без слова Bearer)

    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallbackSecretKey'); //Сравниваем есть ли расшифровка токена среди наших id и сохраняем пользователя в decoded
            req.userId = decoded._id; //Записываем id найденного пользователя в userId
            next() //Переходим к след функции
        } catch (e) {
            res.status(403).json({message: 'Нет доступа'})
        }
    } else {
        res.status(403).json({message: 'Нет доступа'})
    }
}