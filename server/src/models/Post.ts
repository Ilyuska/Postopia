import  { Schema, Document, Types, model } from 'mongoose';

 export interface IPost extends Document {
    image: string,
    title: string;
    message: string;
    user: Types.ObjectId;
    likes: number;
    commentsCount: number;
    createdAt?: Date;
    updatedAt?: Date;
}

const PostSchema: Schema = new Schema<IPost>({
    image: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: {
        type: Number,
        required: true,
    },
    commentsCount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

export default model<IPost>('Post', PostSchema);