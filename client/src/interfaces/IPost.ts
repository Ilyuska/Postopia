import { IUser } from "./IUser";

export interface IPost {
    _id: string
    user: Omit<IUser, 'posts'>;
    image: string,
    title: string;
    message: string;
    liked: boolean
    likes: number;
    comments: number;
}