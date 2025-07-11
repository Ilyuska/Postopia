import  { Schema, Document, model } from 'mongoose';

export interface IComment extends Document {
    user: Schema.Types.ObjectId,
    post: Schema.Types.ObjectId,
    message: string
    createdAt?: Date;
    updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }, 
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
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