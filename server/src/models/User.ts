import  { Schema, Document, Types, model } from 'mongoose';

export interface IUser extends Document {
    firstName: string,
    lastName: string,
    birthday: string,
    email: string,
    passwordHash: string,
    avatar?: string,
    createdAt?: Date;
    updatedAt?: Date;
} 

const UserSchema = new Schema <IUser>({
    firstName: {
        type: String,
        required: true
    }, //Тип строка, поле обязательное
    lastName: {
        type: String,
        required: true
    }, //Тип строка, поле обязательное
    birthday: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, //Уникально (нельзя кучу акков на одну почту)
    },
    passwordHash: {
        type: String,
        required: true
    },
    avatar: {
        type: String, 
        required: false,
        default: ''
    }, //Будет не обязательным
}, {
    timestamps: true, //Добавляем время создания пользователя (И редактирования)
});

export default model<IUser>('User', UserSchema); //Сохранить нашу схему под именем User