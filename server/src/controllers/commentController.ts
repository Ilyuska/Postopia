import { NextFunction, Request, Response } from 'express';
import commentService from '../services/commentService';
import { UnauthorizedError } from '../models/Error';

class CommentController {
    async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.params
            const comments = await commentService.getAll(postId)
            res.status(200).json(comments)
        } catch (err) {
            next(err)
        }
    }


    async create  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const {message}= req.body
            const { postId } = req.params;
            const comment = await commentService.create(message, req.userId, postId)
            res.status(201).json(comment)
        } catch (err) {
            next(err)
        }
    }


    async update  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const { commentId } = req.params;
            const { message } = req.body
            await commentService.update(message, req.userId, commentId)
            res.status(200)
        } catch (err) {
            next(err)
        }
    }


    async delete  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const { postId, commentId } = req.params;
            await commentService.delete(req.userId, postId, commentId)
            res.status(204)
        } catch (err) {
            next(err)
        }
    }
}

export default new CommentController()