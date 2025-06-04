import bcrypt from 'bcrypt'
import User from "../models/User";
import { hashingPassword } from "../utils/hashingPassword";
import { makingToken } from "../utils/makingToken";
import { ConflictError, NotFoundError, UnauthorizedError, ValidationError } from '../models/Error';
import { isValidId } from '../middlewares/isValidId';
import Like from '../models/Like';

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
            throw new ConflictError('Такой пользователь уже существует')
        }

        const hash = await hashingPassword(user.password);
        const doc = new User({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            birthday: user.birthday,
            passwordHash: hash, // Захэшированный пароль
            avatar: user.avatar,
        });

        const savedUser = await doc.save();

        const { passwordHash, createdAt, updatedAt, email, ...userData } = savedUser.toObject();
        const token = makingToken(savedUser.id.toString());
   
        return {
            ...userData,
            token,
        };
    }


    async authorization (user: ILogin) {
        const findedUser = await User.findOne({email: user.email}) //Ищем пользователя по имейлу

        if (!findedUser) {
            throw new UnauthorizedError('Неверный логин или пароль');
        } //Проверка существования пользователья

        const isValidPassword = await bcrypt.compare(user.password, findedUser.passwordHash)

        if (!isValidPassword) {
            throw new UnauthorizedError('Неверный логин или пароль');
        }

        const { passwordHash, createdAt, updatedAt, email, ...userData } = findedUser.toObject();
        const token = makingToken(findedUser.id.toString());

        return {
            ...userData,
            token,
        }
    }   

    
    async getById (userId: string) {
        isValidId(userId, "Пользователь")
        const findedUser = await User.findById(userId)
    

        if (!findedUser) {
            throw new NotFoundError('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async getMe(userId: string) {
        const findedUser = await User.findById(userId);

        if (!findedUser) {
            throw new NotFoundError('Вы не авторизированы');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = findedUser.toObject();

        return {
            ...userData
        }
    }


    async update(userId: string, user: Omit<IRegistration, 'password' | 'email'>) {
        const updatedUser =  await User.findByIdAndUpdate(userId, {...user}, {new: true})

        if (!updatedUser) {
            throw new NotFoundError('Пользователь не найден');
        } 

        const { passwordHash, createdAt, updatedAt, email, ...userData } = updatedUser.toObject();

        return {
            ...userData
        }
    }

    
    async delete (userId: string) {
        const deletedUser = await User.findByIdAndDelete(userId)
        if (!deletedUser) {
            throw new NotFoundError('Пользователь не найден');
        } 
    }

    async getFavorites (userId: string, page: number, limit:number = 5) {
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFoundError('Пользователь не найден');
        } 

        const posts = await Like.find({ user: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({
                path: 'post',
                populate: {
                    path: 'user',
                    select: 'firstName lastName avatar',
                }
            });

        return posts
    }
}

export default new UserService();