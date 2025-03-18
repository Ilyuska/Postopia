import mongoose from "mongoose";
     
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
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
    },
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }]
}, {
    timestamps: true, //Добавляем время создания поста (И редактирования)
});

export default mongoose.model('Post', PostSchema); 