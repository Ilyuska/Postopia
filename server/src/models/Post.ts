import  { Schema, Document, Types, model } from 'mongoose';

 export interface IPost extends Document {
    title: string;
    message: string;
    likes: Types.ObjectId[];
    user: Types.ObjectId;
    comments: Types.ObjectId[];
}

const PostSchema: Schema = new Schema<IPost>({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    likes:  [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        default: [],
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
    }]
}, {
    timestamps: true,
});

export default model<IPost>('Post', PostSchema);