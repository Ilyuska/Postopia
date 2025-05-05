import { Types } from 'mongoose';
import bcrypt from 'bcrypt'
import User from "../models/User";
import { hashingPassword } from "../utils/hashingPassword";
import { makingToken } from "../utils/makingToken";

interface ILogin {
    email: string;
    password: string
}

interface IRegistration extends ILogin {
    firstName: string;
    lastName: string;
    birthday: Date;
    avatar? : string
}


class UserService {
    async registration(user: IRegistration) {
        const findedUser = await User.findOne({email: user.email})

        if (findedUser) {
            throw new Error('Такой пользователь уже существует')
        }

        const hash = await hashingPassword(user.password);
        const doc = new User({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            passwordHash: hash, // Захэшированный пароль
            avatar: user.avatar,
            posts: [],
            favorites: []
        });

        const savedUser = await doc.save();

        const { passwordHash, createdAt, updatedAt, favorites, ...userData } = savedUser.toObject();
        const token = makingToken(savedUser.id.toString());
   
        return {
            ...userData,
            token,
        };
    }


    async authorization (user: ILogin) {
        const findedUser = await User.findOne({email: user.email}) //Ищем пользователя по имейлу

        if (!findedUser) {
            throw new Error('Неверный логин или пароль');
        } //Проверка существования пользователья

        const isValidPassword = await bcrypt.compare(user.password, findedUser.passwordHash)

        if (!isValidPassword) {
            throw new Error('Неверный логин или пароль');
        }

        const { passwordHash, createdAt, updatedAt, favorites, ...userData } = findedUser.toObject();
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

        const { passwordHash, createdAt, updatedAt, email, favorites, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async getMe(userId: Types.ObjectId) {
        const findedUser = await User.findById(userId).populate('posts');

        if (!findedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, favorites, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async update(userId: Types.ObjectId, user: Omit<IRegistration, 'password' | 'email'>) {
        const updatedUser =  await User.findByIdAndUpdate(userId, {...user}, {new: true})

        if (!updatedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, favorites, ...userData } = updatedUser.toObject();

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

    async getFavorites (userId: Types.ObjectId) {
        const findedUser = await User.findById(userId).populate('favorites');
        if (!findedUser) {
            throw new Error('Пользователь не найден');
        } 

        const { favorites, ...userData } = findedUser.toObject();

        return {
            favorites
        }
    }
}

export default new UserService();