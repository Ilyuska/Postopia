import mongoose from "mongoose";
     
const UserSchema = new mongoose.Schema({
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
    avatar: String, //Будет не обязательным
    posts: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post' 
    }]
}, {
    timestamps: true, //Добавляем время создания пользователя (И редактирования)
});

export default mongoose.model('User', UserSchema); //Сохранить нашу схему под именем User