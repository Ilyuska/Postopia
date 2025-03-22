import  { Schema, Document, model } from 'mongoose';

interface IComment extends Document {
    user: Schema.Types.ObjectId,
    message: string
}

const CommentSchema = new Schema<IComment>({
    user: {
        type: Schema.Types.ObjectId,
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

export default model<IComment>('Comment', CommentSchema);