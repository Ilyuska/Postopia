import Post, { IPost } from "../models/Post";
import { ForbiddenError, NotFoundError, ValidationError } from "../models/Error";
import { isValidId } from "../middlewares/isValidId";
import Like, { ILike } from "../models/Like";
import { postsWithLikes } from "../utils/postsWithLikes";

interface ICreatePost {
    user: string 
    title: string,
    message: string,
    image?: string
}

class PostService {
    async getAll (userId: string, page: number, limit: number = 5) {
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        const posts = await Post.find({user: { $ne: userId }}) //Исключаем свои посты
            .skip((page - 1) * limit) // Пропускаем (page-1)*10 документов
            .limit(limit)
            .populate('user', 'firstName lastName avatar') // Автор поста
            .sort({ createdAt: -1 }) // Сортировка постов (новые сначала)

        console.log(posts)

        const totalCount = await Post.countDocuments();
        const likedPosts = await postsWithLikes(posts, userId)

        return {
            posts: likedPosts,
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

        if (!post) {
            throw new NotFoundError("Пост не найден");
        }
        return post
    }

    async getUserPosts(userId: string, myId:string, page: number, limit:number=5){
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        const posts = await Post.find({user: userId})
            .skip((page - 1) * limit) // Пропускаем (page-1)*10 документов
            .limit(limit)
            .sort({ createdAt: -1 }) // Сортировка постов (новые сначала)

        const totalCount = await Post.countDocuments({ user: userId });

        const likedPosts = await postsWithLikes(posts, userId)

        return {
            posts: likedPosts,
            pagination: {
                page,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    }


    async create (post: ICreatePost) {
        const doc = new Post({
            user: post.user,
            title: post.title,
            message: post.message,
            image: post.image,
            likes: 0,
            commentsCount: 0
        });

        const savedPost = await doc.save()
  
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
    }


    async like (postId: string, userId: string) {
        isValidId(postId, "Пост")

        const post = await Post.findById(postId);
        if (!post) {
            throw new NotFoundError("Пост не найден");
        }

        const like = await Like.findOne({user:userId, post: postId})

        if (like) {
            await Like.findByIdAndDelete(like.id)
        } else {
            const like = new Like ({
                user: userId,
                post: postId
            })
            await like.save()
        }
        return
    }

    async  getFavorites (userId: string, page: number, limit:number = 5) {
        if (page < 1) throw new ValidationError('Page должен быть >= 1');

        const likes = await Like.find({ user: userId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate({
                path: 'post',
                populate: {
                    path: 'user',
                    select: 'firstName lastName avatar',
                }
            })
        
        const totalCount = await Like.countDocuments({ user: userId });
        const posts: IPost[] = likes.map((like) => like.post as IPost);
        const likedPosts = await postsWithLikes(posts, userId)
    
        return {
            posts: likedPosts,
            pagination: {
                page,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            },
        };
    }
}

export default new PostService()