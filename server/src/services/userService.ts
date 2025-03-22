import { Types } from 'mongoose';
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
            posts: []
        });

        const savedUser = await doc.save();

        const { passwordHash, createdAt, updatedAt, ...userData } = savedUser.toObject();
        const token = makingToken(savedUser.id.toString());
   
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
        const token = makingToken(findedUser.id.toString());

        return {
            ...userData,
            token,
        }
    }   

    
    async getById (userId: Types.ObjectId) {
        const findedUser = await User.findById({_id: userId})

        if (!findedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async getMe(userId: Types.ObjectId) {
        const findedUser = await User.findById({_id: userId})

        if (!findedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async update(userId: Types.ObjectId, user) {
        const updatedUser =  await User.findByIdAndUpdate(userId, {...user}, {new: true})

        if (!updatedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = updatedUser.toObject();

        return {
            ...userData
        }
    }

    
    async delete (userId: Types.ObjectId) {
        const deletedUser = await User.findByIdAndDelete(userId)

        if (!deletedUser) {
            throw new Error('Пользователь не найден');
        } 

        return {message: 'Ваш аккаунт удален'}
    }
}

export default new UserService();