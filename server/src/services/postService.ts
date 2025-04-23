import { Types } from "mongoose";
import Post, { IPost } from "../models/Post";

interface ICreatePost {
    user: Types.ObjectId | undefined
    title: string,
    message: string,
    image?: string
}

class PostService {
    async getAll (userId: Types.ObjectId) {
        const posts = await Post.find()
        .populate('user', 'name avatar') // Подгружаем только name и avatar
        .exec();

        if (!posts || posts.length === 0) {
            return { message: 'Посты не найдены' };
        }

        const postsWithLiked = posts.map(post => {
            const plainPost = post.toObject(); // превращаем документ в обычный объект
            return {
                ...plainPost,
                liked: post.likes.includes(userId), // добавляем поле liked
            };
        });
    
        return postsWithLiked;
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