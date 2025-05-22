import Post from "../models/Post";
import Comment from "../models/Comment";
import { ForbiddenError, NotFoundError, ValidationError } from "../models/Error";
import { isValidId } from "../middlewares/isValidId";

class CommentService {
    async getAll(postId: string, page: number = 1, limit: number = 10) {
        isValidId(postId, 'Пост')
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        
        const post = await Post.findById(postId).select('comments'); // Берём только массив comments

        if (!post) {
            throw new NotFoundError('Пост не найден');
        }

        const startIdx = (page - 1) * limit;
        const endIdx = page * limit;
        const paginatedCommentIds = post.comments.slice(startIdx, endIdx);

        const comments = await Comment.find({
            _id: { $in: paginatedCommentIds }
        })
            .populate('user', 'firstName lastName avatar')
            .sort({ createdAt: -1 });

        const totalCount = post.comments.length;

        return {
            comments: comments,
            pagination: {
                page,
                limit,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
            }
        };
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