import mongoose from "mongoose";
     
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, //Тип строка, поле обязательное
    message: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // Пост должен быть связан с пользователем
    }
}, {
    timestamps: true, //Добавляем время создания пользователя (И редактирования)
});

export default mongoose.model('Post', PostSchema); //Сохранить нашу схему под именем User