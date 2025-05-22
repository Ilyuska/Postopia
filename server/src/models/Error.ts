export class AppError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public details?: any,
    ) {
        super(message)
        Object.setPrototypeOf(this, new.target.prototype)
    }
}

export class ValidationError extends AppError {
    constructor (message = "Неправильный запрос", details?: any) {
        super (400, message, details)
    }
}

export class UnauthorizedError extends AppError {
    constructor (message = "Вы не авторизованы", details?: any) {
        super (401, message, details)
    }
}

export class ForbiddenError extends AppError {
    constructor (message = "У вас нет на это прав", details?: any) {
        super (403, message, details)
    }
}

export class NotFoundError extends AppError {
    constructor (message = "Страница не найдена", details?: any) {
        super (404, message, details)
    }
}

export class ConflictError extends AppError {
  constructor(message: string, details?: any) {
    super(409, message, details);
  }
}
