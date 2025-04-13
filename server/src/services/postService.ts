import { Types } from "mongoose";
import Post, { IPost } from "../models/Post";

interface ICreatePost {
    user: Types.ObjectId | undefined
    title: string,
    message: string,
    image?: string
}

class PostService {
    async getAll () {
        const posts = await Post.find<IPost[]>()
            .populate('user', 'name avatar') // Поля, которые нужно получить
            .populate('likes', 'name avatar')
            .exec();

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


    async create (post: ICreatePost) {
        const doc = new Post({
            user: post.user,
            title: post.title,
            message: post.message,
            image: post.image,
            likes: [],
            comments: []
        });
        
        const savedPost = await doc.save()
  
        return savedPost;
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


    async update (postId: Types.ObjectId, newPost: ICreatePost) {
        const post = await Post.findOne({ _id: postId, user: newPost.user });
        if (!post) {
            return  {success: false, message: 'Вы не можете редактировать пост'}
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: newPost },
            { new: true }
        );
        return updatedPost
            ? {success: true, message: updatedPost}
            : { success: false, message: 'Пост не найден после обновления' }
    }


    async delete (postId: Types.ObjectId, userId: Types.ObjectId | undefined) {
        const post = await Post.findOne({ _id: postId, user: userId });
        if (!post) {
            return  {success: false, message: 'Вы не можете удалить пост'}
        }

        const deletedPost = await Post.findByIdAndDelete<IPost>(postId)
        return {success: true, message: 'Ваш пост удален'}

    }
}

export default new PostService()