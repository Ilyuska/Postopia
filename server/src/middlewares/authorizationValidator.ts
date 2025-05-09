import { NextFunction, Request, Response } from 'express';
import { z } from 'zod'

const authorizationSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

export const authorizationValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedUser = authorizationSchema.parse(req.body);
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            // Отправляем ответ и завершаем выполнение функции
            res.status(400).json(errors.reduce((acc, err) => {
                return { ...acc, [err.field]: err.message }}
                , {})
            )
        } else {
            // Если ошибка не связана с валидацией
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

}