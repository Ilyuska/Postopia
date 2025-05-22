import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import { UnauthorizedError } from '../models/Error';

dotenv.config(); // Загружаем переменные из .env

declare module 'express' {
    interface Request {
        userId?: string;
    }
}

export const isAuthorizated = (req: Request, res: Response, next: NextFunction) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '') //Получаем либо пустую строку либо токен (без слова Bearer)
    if (!token){ 
        throw new UnauthorizedError('Пользователь не авторизирован')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.userId = decoded._id;
        next() //Переходим к след функции
    } catch (e) {
        throw new UnauthorizedError('Пользователь не авторизирован')
    }
}