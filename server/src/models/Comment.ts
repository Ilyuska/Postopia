import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true, //Добавляем время создания комментария (И редактирования)
})

export default mongoose.model('Comment', CommentSchema);