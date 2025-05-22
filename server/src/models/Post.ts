import  { Schema, Document, Types, model } from 'mongoose';

 export interface IPost extends Document {
    image: string,
    title: string;
    message: string;
    likes: Types.ObjectId[];
    user: Types.ObjectId;
    comments: Types.ObjectId[];
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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: [] // Явно указываем пустой массив по умолчанию
      }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment',
        default: [],
    }]
}, {
    timestamps: true,
    autoIndex: false,
});

export default model<IPost>('Post', PostSchema);