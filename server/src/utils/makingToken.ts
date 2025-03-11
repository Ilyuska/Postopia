import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Загружаем переменные из .env

export const makingToken = (userId: string): string => {
    const token = jwt.sign(
        {
            _id: userId,
        },
        process.env.JWT_SECRET || 'fallbackSecretKey', // Используем ключ из .env или резервный ключ
        {
            expiresIn: '30d', // Токен будет валиден в течение 30 дней
        }
    );
    return token;
};