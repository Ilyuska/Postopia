import bcrypt from 'bcrypt'
import User from "../models/User";
import { hashingPassword } from "../utils/hashingPassword";
import { makingToken } from "../utils/makingToken";

interface IUser {
    email: string;
    name?: string;
    password: string;
}


class UserService {
    async registration(user: IUser) {
        const hash = await hashingPassword(user.password);
        const doc = new User({
            email: user.email,
            name: user.name,
            passwordHash: hash, // Захэшированный пароль
        });

        const savedUser = await doc.save();

        const { passwordHash, createdAt, updatedAt, ...userData } = savedUser.toObject();
        const token = makingToken(savedUser._id.toString());
   
        return {
            ...userData,
            token,
        };
    }


    async authorization (user: IUser) {
        const findedUser = await User.findOne({email: user.email}) //Ищем пользователя по имейлу

        if (!findedUser) {
            throw new Error('Неверный логин или пароль');
        } //Проверка существования пользователья

        const isValidPassword = await bcrypt.compare(user.password, findedUser.passwordHash)

        if (!isValidPassword) {
            throw new Error('Неверный логин или пароль');
        }

        const { passwordHash, createdAt, updatedAt, ...userData } = findedUser.toObject();
        const token = makingToken(findedUser._id.toString());

        return {
            ...userData,
            token,
        }
    }    
}

export default new UserService();