import { NextFunction, Request, Response } from 'express';
import { z } from 'zod'

const registrationSchema = z.object({
    email: z.string().email("Некорректный email"),
    firstName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    lastName: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    birthday: z.string().date("Некорректные данные")
        .refine(str => {
            const birthDate = new Date(str);
            const today = new Date();
            const minAgeDate = new Date(
            today.getFullYear() - 13,
            today.getMonth(),
            today.getDate()
            );
            return birthDate <= minAgeDate;
        }, "Возраст должен быть больше 13 лет")
});

export const registrationValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, firstName, lastName, birthday, password } = req.body;
        const validatedUser = registrationSchema.parse({ email, firstName, lastName, birthday, password });
        next()
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            // Отправляем ответ и завершаем выполнение функции
            res.status(400).json({ message: "Некорректные данные", errors });
        } else {
            // Если ошибка не связана с валидацией
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
        }
    }

}

