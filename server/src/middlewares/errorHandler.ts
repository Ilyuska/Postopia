import { NextFunction, Request, Response, ErrorRequestHandler } from "express";
import { AppError } from "../models/Error";

export const errorHandler = ((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details
        })
    }

    console.log(err)
    res.status(500).json({ message: "Непредвиденная ошибка сервера. Нужна валидация"})
}) as ErrorRequestHandler