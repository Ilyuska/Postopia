import { Request, Response } from 'express';
import { Types } from 'mongoose';
import postService from '../services/postService';
import { IPost } from '../models/Post';

interface IResponse {
    success: boolean,
    message: string | IPost
}

const NotFoundPost = (res: Response, post: IResponse) => {
    if (!post.success) {
        res.status(404).json(post.message)
    } else {
        res.status(200).json(post.message)
    }
}

class PostController {
    async getAll (req: Request, res: Response) {
        try {
            const posts = await postService.getAll()
            res.status(200).json(posts)
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

            if (req.userId) {
                const post = await postService.create(title, message, req.userId)
                res.status(200).json(post)
            } else {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось создать пост')
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
            const id = new Types.ObjectId(req.params.id)
            const post = await postService.update(id, req.body)
            NotFoundPost(res, post)
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось обновить пост')
        }
    }


    async delete (req: Request, res: Response) {
        try {
            const id = new Types.ObjectId(req.params.id)
            const post = await postService.delete(id)
            NotFoundPost(res, post)
        } catch (error) {
            console.error(error)
            res.status(500).json('Не удалось удалить пост')
        }
    }
}

export default new PostController()