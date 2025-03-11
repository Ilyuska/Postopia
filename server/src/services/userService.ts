import { z } from 'zod'
import User from "../models/User";
import { hashingPassword } from "../utils/hashingPassword";
import { makingToken } from "../utils/makingToken";

interface IUser {
    email: string;
    name: string;
    password: string;
}

const registrationSchema = z.object({
    email: z.string().email("Некорректный email"),
    name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
});

class UserService {
    async registration(user: IUser) {
        try {
            const validatedUser = registrationSchema.parse(user);

            const hash = await hashingPassword(validatedUser.password);
            const doc = new User({
                email: validatedUser.email,
                name: validatedUser.name,
                passwordHash: hash, // Захэшированный пароль
            });

            const savedUser = await doc.save();

            const token = makingToken(savedUser._id.toString());

            const { passwordHash, createdAt, updatedAt, ...userData } = savedUser.toObject();

            return {
                ...userData,
                token,
            };
        } catch (error) {
            console.error('Ошибка при регистрации:', error);
            throw new Error('Не удалось зарегистрировать пользователя');
        }
    }
}

export default new UserService();