import { Types } from "mongoose";
import Post, { IPost } from "../models/Post";
import User from "../models/User";
import { ForbiddenError, NotFoundError, ValidationError } from "../models/Error";
import { isValidId } from "../middlewares/isValidId";

interface ICreatePost {
    user: string 
    title: string,
    message: string,
    image?: string
}

class PostService {
    async getAll (userId: string, page: number, limit: number = 10) {
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        const posts = await Post.find()
            .skip((page - 1) * limit) // Пропускаем (page-1)*10 документов
            .limit(limit)
            .populate('user', 'firstName lastName avatar') // Автор поста
            .sort({ createdAt: -1 }) // Сортировка постов (новые сначала)

        const totalCount = await Post.countDocuments({ user: userId });

        const postsWithLiked = posts.map(post => {
            const plainPost = post.toObject(); // превращаем документ в обычный объект
            return {
                ...plainPost,
                liked: post.likes.includes(new Types.ObjectId(userId)), // добавляем поле liked
                likes: post.likes.length,
                comments: post.comments.length
            };
            });

        return {
            posts: postsWithLiked,
            pagination: {
                page,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
    };
    }


    async getById (postId: string) {
        isValidId(postId, "Пост")

        const post = await Post.findById<IPost>(postId)
            .populate('user', 'firstName lastName avatar')
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'firstName lastName avatar'
                },
                options: {
                    sort: { createdAt: -1 } // Сортировка комментариев по дате (новые сначала)
                }
            });

        if (!post) {
            throw new NotFoundError("Пост не найден");
        }
        return post
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

        await User.findByIdAndUpdate(
            savedPost.user,
            { $push: { posts: savedPost._id } }, // Добавляем ID поста в массив posts
        );
  
        return savedPost;
    }


    async update (postId: string, newPost: ICreatePost) {
        const post = await Post.findById<IPost>(postId);
        if (!post) {
            throw new NotFoundError("Пост не найден")
        }

        if (post.user.toString() !== newPost.user) {
            throw new ForbiddenError("У вас нет прав на редактирование")
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: newPost },
            { new: true }
        );
        return updatedPost
    }


    async delete (postId: string, userId: string) {
        const post = await Post.findById<IPost>(postId);
        if (!post) {
            throw new NotFoundError("Пост не найден")
        }

        if (post.user.toString() !== userId) {
            throw new ForbiddenError("У вас нет прав на редактирование")
        }

        await Post.findByIdAndDelete(postId,);
        return
    }


    async like (postId: string, userId: string) {
        isValidId(postId, "Пост")

        const post = await Post.findById(postId);

        if (!post) {
            throw new NotFoundError("Пост не найден");
        }

        // Проверяем, есть ли userId в массиве likes
        if (post.likes.some(like => like.equals(userId))) {
            post.likes = post.likes.filter(like => !like.equals(userId));
            await User.findByIdAndUpdate(
                userId,
                { $pull: { favorites: post._id } }, // Удаляем пост из избранных
            );
        } else {
            post.likes.push(new Types.ObjectId(userId))
            await User.findByIdAndUpdate(
                userId,
                { $push: { favorites: post._id } }, // Добавляем пост в избранные
            );
        }    
        const newPost = await post.save();
        
        return newPost
    }
}

export default new PostService()