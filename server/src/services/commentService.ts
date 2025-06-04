import Post from "../models/Post";
import Comment from "../models/Comment";
import { ForbiddenError, NotFoundError, ValidationError } from "../models/Error";
import { isValidId } from "../middlewares/isValidId";

class CommentService {
    async getAll(postId: string, page: number = 1, limit: number = 10) {
        isValidId(postId, 'Пост')
        if (page < 1) throw new ValidationError('Page должен быть >= 1');
        
        const post = await Post.findById(postId)

        if (!post) {
            throw new NotFoundError('Пост не найден');
        }

        const comments = await Comment.find({ post: postId })
            .skip((page - 1) * limit)
            .limit(limit)
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName avatar');

        const totalCount = post.commentsCount;

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
            post: postId
        });

        await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });

        const savedComment = await doc.save()
        
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

        await Comment.findByIdAndUpdate(commentId, {...comment, message}, {new: true})
    }


    async delete (userId: string, commentId: string ) {
        const comment =  await Comment.findById(commentId)

        if (!comment) {
            throw new NotFoundError('Комментарий не найден')
        } 
        if (comment.user.toString() !== userId) {
            throw new ForbiddenError('Вы можете удалять только свои комментарии')
        }

        await Comment.findByIdAndDelete(commentId)
    }
}

export default new CommentService()