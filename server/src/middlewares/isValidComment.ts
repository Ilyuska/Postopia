import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const commentSchema = z.object({
    message: z.string().min(1, 'Комментарий не должен быть пустым').max(500, 'Комментарий должен быть меньше 500 символов'),
});

export const isValidComment = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Валидируем все тело запроса, а не только message
        commentSchema.parse(req.body)
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            // Стандартизированный формат ошибок
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            
            res.status(400).json({
                success: false,
                message: 'Ошибка валидации',
                errors
            });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ 
                success: false,
                message: "Внутренняя ошибка сервера" 
            });
        }
    }
};