import { Types } from "mongoose";
import Post, { IPost } from "../models/Post";

class PostService {
    async getAll () {
        const posts = await Post.find<IPost[]>()

        if (!posts) {
            return {message: 'Посты не найдены'};
        } 

        return posts
    }


    async getById (postId: Types.ObjectId) {
        const post = await Post.findById<IPost>(postId)

        if (!post) {
            return { success: false, message: 'Пост не найден' };
        }
        return {success: true, message: post}
    }


    async create (postTitle: string, postMessage: string, userId: Types.ObjectId) {
        const doc = new Post({
            title: postTitle,
            message: postMessage,
            likes: [],
            user: userId,
            comments: []
        });
        
        const savedPost = await doc.save();
  
        return savedPost
    }


    async like (postId: Types.ObjectId | string, userId: Types.ObjectId) {
        const post = await Post.findById(postId);

        if (!post) {
            return { success: false, message: 'Пост не найден' };
        }

        // Проверяем, есть ли userId в массиве likes
        if (post.likes.some(like => like.equals(userId))) {
            post.likes = post.likes.filter(like => !like.equals(userId));
        } else {
            post.likes.push(userId)
        }    
        const newPost = await post.save();
        
        return {success: true, message: newPost}
    }


    async update (postId: Types.ObjectId, post: IPost) {
        const updatedPost = await Post.findByIdAndUpdate<IPost>(postId, { $set: post }, {new: true})

        if (!updatedPost) {
            return { success: false, message: 'Пост не найден' };
        } 

        return {success: true, message: updatedPost}
    }


    async delete (postId: Types.ObjectId) {
        const deletedPost = await Post.findByIdAndDelete<IPost>(postId)

        if (!deletedPost) {
            return { success: false, message: 'Пост не найден' };
        }

        return {success: true, message: 'Ваш пост удален'}

    }
}

export default new PostService()