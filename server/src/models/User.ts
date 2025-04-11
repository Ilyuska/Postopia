import  { Schema, Document, Types, model } from 'mongoose';

export interface IUser extends Document {
    name: string,
    email: string,
    passwordHash: string,
    avatar?: string,
    posts: Types.ObjectId[]
    createdAt?: Date;
    updatedAt?: Date;
} 

const UserSchema = new Schema <IUser>({
    name: {
        type: String,
        required: true
    }, //Тип строка, поле обязательное
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
    posts: [{
        type: Types.ObjectId, 
        ref: 'Post',
        default: []
    }]
}, {
    timestamps: true, //Добавляем время создания пользователя (И редактирования)
});

export default model<IUser>('User', UserSchema); //Сохранить нашу схему под именем User