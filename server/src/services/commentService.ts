import Post from "../models/Post";
import Comment from "../models/Comment";
import { ForbiddenError, NotFoundError } from "../models/Error";

class CommentService {
    async getAll (postId: string) {
        const comments = await Post.findById(postId)
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

        if (!comments) {
            throw new NotFoundError('Пост не найден');
        }

        return comments
    }


    async create (message: string, userId: string, postId: string) {
        const post = await Post.findById(postId);

        if (!post) {
            throw new NotFoundError ('Пост не найден');
        }

        const doc = new Comment({
            user: userId,
            message: message,
        });

        const savedComment = await doc.save()

        await Post.findByIdAndUpdate(
            postId,
            { $push: { comments: savedComment._id } }, // Добавляем ID поста в массив posts
        );
        
        return savedComment
    }


    async update (message: string, userId: string, commentId: string) {
        const comment =  await Comment.findById(commentId)

        if (!comment) {
            throw new NotFoundError('Комментарий не найден')
        } 
        if (comment.user.toString() !== userId) {
            throw new ForbiddenError('Вы можете изменять только свои комментарии')
        }

        await Comment.findByIdAndUpdate( commentId,
            { $set: {message} },
        )
    }


    async delete (userId: string, postId: string, commentId: string ) {
        const comment =  await Comment.findById(commentId)

        if (!comment) {
            throw new NotFoundError('Комментарий не найден')
        } 
        if (comment.user.toString() !== userId) {
            throw new ForbiddenError('Вы можете удалять только свои комментарии')
        }

        await Comment.findByIdAndUpdate(commentId)
        await Post.findByIdAndUpdate(
            postId,
            { $pull: { comments: comment.id } }, // Добавляем пост в избранные
        );
    }
}

export default new CommentService()