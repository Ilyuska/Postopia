import { Request, Response } from 'express';
import { Types } from 'mongoose';
import postService from '../services/postService';
import { IPost } from '../models/Post';

interface IResponse {
    success: boolean,
    message: string | IPost
}

const NotFoundPost = (res: Response, post: IResponse) => {
    post.success === true ? 
                res.status(200).json(post.message) :
                res.status(403).json({ error: post.message })
}

class PostController {
    async getAll (req: Request, res: Response) {
        try {
            if (req.userId) {
                const userId = req.userId
                const posts = await postService.getAll(userId)
                res.status(200).json(posts)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось получить посты')
        }
    }


    async getById (req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const post = await postService.getById(id)
            NotFoundPost(res, post)
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось получить пост')
        }
    }


    async create (req: Request, res: Response) {
        try {
            const {title, message} = req.body
            const image = req.file ? `${req.file.filename}` : '';

            if (req.userId) {
                const post = await postService.create({user: req.userId, title, message, image})
                res.status(200).json(post)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json(error)
        }
    }


    async like (req: Request, res: Response) {
        try {
            const id = req.params.id

            if (req.userId) {
                const post = await postService.like(id, req.userId)
                NotFoundPost(res, post)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось обновить пост')
        }
    }


    async update (req: Request, res: Response) {
        try {
            const {title, message} = req.body
            const postId = new Types.ObjectId(req.params.id)
            const image = req.file ? `${req.file.filename}` : '';

            if (req.userId) {
                const post = await postService.update(postId, {user: req.userId, title, message, image})
                NotFoundPost(res, post)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось обновить пост')
        }
    }


    async delete (req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const post = await postService.delete(id, req.userId)
            NotFoundPost(res, post)
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось удалить пост')
        }
    }
}

export default new PostController()