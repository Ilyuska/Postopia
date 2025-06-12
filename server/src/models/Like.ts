import  { Schema, Document, model } from 'mongoose';
import { IPost } from './Post';

export interface ILike extends Document {
    user: Schema.Types.ObjectId,
    post: IPost | Schema.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const LikeSchema = new Schema<ILike>({
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

}, {
    timestamps: true,
})

export default model<ILike>('Like', LikeSchema);