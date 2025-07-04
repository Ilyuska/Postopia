import { NextFunction, Request, Response } from 'express';
import postService from '../services/postService';
import { UnauthorizedError } from '../models/Error';


class PostController {
    async getAll (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const page = Number(req.query.page) || 1
            const posts = await postService.getAll(req.userId, page)
            res.json(posts)
        } catch (err) {
            next(err)
        }
    }


    async getById (req: Request, res: Response, next: NextFunction) {
        try {
            const post = await postService.getById(req.params.id)
            res.json(post)
        } catch (err) {
            next(err)
        }
    }

    async getUserPosts (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const page = Number(req.query.page) || 1
            const posts = await postService.getUserPosts(req.params.id, req.userId, page)
            res.json(posts)
        } catch (err) {
            next(err)
        }
    }


    async create (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const {title, message} = req.body
            const image = req.file ? `${req.file.filename}` : '';
            const post = await postService.create({user: req.userId, title, message, image})
            res.status(201).json(post)
        } catch (err) {
            next(err)
        }
    }


    async like (req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            if (!req.userId) throw new UnauthorizedError()
            await postService.like(id, req.userId)
            res.status(204).end()
        } catch (err) {
            next(err)
        }
    }


    async update (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const {title, message} = req.body
            const image = req.file ? `${req.file.filename}` : '';
            const post = await postService.update(req.params.id, {user: req.userId, title, message, image})
            res.json(post)
        } catch (err) {
            next(err)
        }
    }


    async delete (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            await postService.delete(req.params.id, req.userId)
            res.status(204).end()
        } catch (error) {
            next()
        }
    }

    async getFavorites  (req: Request, res: Response, next: NextFunction) {
        try {
            if (!req.userId) throw new UnauthorizedError()
            const page = Number(req.query.page) || 1
            const favorites = await postService.getFavorites(req.userId, page)
            res.status(200).json(favorites)          
        } catch (err) {
            next(err)
        }
    }
}

export default new PostController()